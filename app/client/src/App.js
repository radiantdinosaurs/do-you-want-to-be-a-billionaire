/******************************
 * Dependencies
 *****************************/
import React, { Component } from "react";

/******************************
 * Components
 *****************************/

import Start from "./components/Splash/Splash";
import Quiz from "./components/Quiz/QuizContainer";
import Background from "./components/Background/Background";
import Fade from "./components/Transitions/Fade";
import Modal from "./components/Modal/Modal";

/******************************
 * Helper functions
 *****************************/

import * as request from "./helpers/requests";

/******************************
 * App
 *****************************/

class App extends Component {
    constructor() {
        super();
        this.state = {
            showSplash: true, // Controls when to show the start button
            result: {}, // Holds the result of the game
            counter: 0, // Used for selecting current question (by index)
            questions: [], // Trivia questions (an array of objects)
            seconds: 30, // Used for the 30-second countdown on each question
            modalIsOpen: false, // Controls when the lifeline modal is shown
            modalMessage: "" // Holds the message shown in the lifeline modal
        };
    }

    componentDidMount() {
        //  If there's no existing session, get a session
        if (!sessionStorage.getItem("token")) request.getSession();
    }

    getQuestions = async () => {
        let questions = await request.handleFetchingTrivia();
        if (questions.error && questions.error === "Token is empty.") {
            const token = await request.resetToken();
            questions = await request.handleFetchingTrivia();
            this.setState({
                counter: 0,
                questions: questions,
                showSplash: false,
                seconds: 30
            });
            setInterval(this.handleCountingDown, 1000);
        } else {
            this.setState({
                counter: 0,
                questions: questions,
                showSplash: false,
                seconds: 30
            });
        }
    };

    handleCountingDown = () => {
        const seconds = this.state.seconds - 1;

        this.setState(state => ({
            ...state,
            seconds
        }));

        if (seconds === 0)
            this.setResult({ message: "Time's up!", lost: true });
    };

    setNextQuestion = () => {
        const counter = this.state.counter + 1;

        this.setState(state => ({
            ...state,
            counter: counter,
            seconds: 30
        }));
    };

    setResult = result => {
        this.setState(state => ({
            showSplash: true,
            result: result,
            seconds: 0,
            interval: clearInterval(state.interval)
        }));
    };

    openModal = element => {
        this.setState({ modalIsOpen: true, modalMessage: element });
    };

    closeModal = event => {
        event.preventDefault();
        this.setState({ modalIsOpen: false });
    };

    render() {
        const {
            showSplash,
            result,
            counter,
            questions,
            seconds,
            modalIsOpen,
            modalMessage
        } = this.state;

        return (
            <div id="content-container">
                {/* Modal */}
                <Fade in={modalIsOpen}>
                    <Modal
                        modalMessage={modalMessage}
                        closeModal={this.closeModal}
                    />
                </Fade>

                <Background />

                {/* Splash page */}
                <Fade in={showSplash}>
                    <Start getQuestions={this.getQuestions} result={result} />
                </Fade>

                {/* Quiz */}
                <Fade in={!showSplash} mountOnEnter unmountOnExit>
                    <Quiz
                        counter={counter}
                        openModal={this.openModal}
                        questions={questions}
                        seconds={seconds}
                        setNextQuestion={this.setNextQuestion}
                        setResult={this.setResult}
                    />
                </Fade>
            </div>
        );
    }
}

export default App;
