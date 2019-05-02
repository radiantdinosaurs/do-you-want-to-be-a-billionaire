/******************************
 * Dependencies
 *****************************/
import React, { Component } from "react";

/******************************
 * Components
 *****************************/

import Splash from "./components/Splash/Splash";
import Quiz from "./components/Quiz/QuizContainer";
import Background from "./components/Background/Background";
import Fade from "./components/Transitions/Fade";
import Modal from "./components/Modal/Modal";
import Snackbar from "./components/Snackbar/Snackbar";

/******************************
 * Helper functions
 *****************************/

import * as request from "./helpers/requests";

/******************************
 * App
 *****************************/

class App extends Component {
    state = {
        showSplash: true, // Controls when to show the start button
        result: null, // An object that holds the result of the game
        counter: 0, // Used for selecting current question (by index)
        questions: [], // Trivia questions (an array of objects)
        seconds: 30, // Used for the 30-second countdown on each question
        modal: {
            open: false, // Controls when the modal is shown
            message: null // Message shown in modal
        },
        snackbar: {
            show: false, // Controls when the snackbar is shown
            message: "" // Message shown in snackbar
        }
    };

    componentDidMount() {
        //  If there's no existing session, get a session
        if (!sessionStorage.getItem("token")) request.getSession();
    }

    /**
     * Handles the timer on a question, which gives the user thirty seconds
     * to answer it
     */
    handleCountingDown = () => {
        const seconds = this.state.seconds - 1;

        this.setState(state => ({
            ...state,
            seconds
        }));

        //  When the timer runs out, set the result to tell the user time's up
        if (seconds === 0) {
            this.handleEndingGame({ message: "Time's up!", lost: true });
        }
    };

    /**
     * Gets a list of questions (and resets the token if needed, which is
     * required for getting a list of questions sometimes)
     */
    handleGettingQuestions = async () => {
        //  Fetch the questions
        let questions = await request.handleFetchingTrivia();
        //  Check if there's an error in the response
        if (questions.error) {
            //  If the token is empty, send it off to the handler
            //  to reset the token.
            if (questions.error === "Token is empty.") {
                this.handleResetToken();
            }
            //  If it's another error, show the snackbar with an error message
            else {
                this.handleShowingSnackbar(
                    "Sorry, we encountered an unknown error"
                );
            }
        } else return questions;
    };

    /**
     * Handles showing the snackbar (e.g., setting the state and timer)
     */
    handleShowingSnackbar = message => {
        //  Show the snackbar
        this.setSnackbarState(true, message);
        //  After five seconds, hide the snackbar
        setTimeout(() => this.setSnackbarState(false, ""), 5000);
    };

    /**
     * Handles the reset of a token
     */
    handleResetToken = async () => {
        //  Make a request to reset the token
        const token = await request.resetToken();

        //  Checking if the response isn't good
        if (token.response_code !== request.responseCodes.GOOD) {
            this.handleShowingSnackbar(
                "Sorry, we encountered an unknown error"
            );
        }
        //  Resetting a token means the user was trying to play a game, so
        //  we'll try to get the user some questions after a successful reset
        else this.handleGettingQuestions();
    };

    /**
     * Handles all the actions needed to start the game (e.g., getting the
     * questions, reset token if needed, starting the countdown, etc.)
     */
    handleStartingGame = async () => {
        //  Get the questions
        const questions = await this.handleGettingQuestions();
        //  Set the state for game start
        this.setGameStart(questions);
        //  Start the countdown
        this.timer = setInterval(this.handleCountingDown, 1000);
    };

    handleEndingGame = result => {
        clearInterval(this.timer);
        this.setResult(result);
    };

    setGameStart = questions => {
        this.setState({
            counter: 0,
            questions: questions,
            showSplash: false,
            seconds: 30
        });
    };

    setNextQuestion = () => {
        const counter = this.state.counter + 1;

        this.setState(state => ({
            ...state,
            counter: counter,
            seconds: 30
        }));
    };

    setSnackbarState = (show, message) => {
        this.setState({
            snackbar: {
                show: show,
                message: message
            }
        });
    };

    setResult = result => {
        this.setState(state => ({
            ...state,
            showSplash: true,
            result: result,
            seconds: 0
        }));
    };

    openModal = element => {
        this.setState({
            modal: {
                open: true,
                message: element
            }
        });
    };

    closeModal = () => {
        this.setState({
            modal: {
                open: false
            }
        });
    };

    render() {
        const {
            showSplash,
            result,
            counter,
            questions,
            seconds,
            modal,
            snackbar
        } = this.state;

        return (
            <section id="content-container">
                {/* Modal */}
                <Fade in={modal.open}>
                    <Modal
                        message={modal.message}
                        closeModal={this.closeModal}
                    />
                </Fade>

                <Background />

                {/* Splash page */}
                <Fade in={showSplash}>
                    <Splash
                        startGame={this.handleStartingGame}
                        result={result}
                    />
                </Fade>

                {/* Quiz */}
                <Fade in={!showSplash} mountOnEnter unmountOnExit>
                    <Quiz
                        counter={counter}
                        openModal={this.openModal}
                        questions={questions}
                        seconds={seconds}
                        setNextQuestion={this.setNextQuestion}
                        endGame={this.handleEndingGame}
                    />
                </Fade>

                {/* Snackbar */}
                <Snackbar snackbar={snackbar} />
            </section>
        );
    }
}

export default App;
