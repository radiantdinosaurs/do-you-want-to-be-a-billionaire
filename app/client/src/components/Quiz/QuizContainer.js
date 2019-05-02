import React, { Component } from "react";
import PropTypes from "prop-types";
import Timer from "./Timer/Timer";
import LifeLine from "./LifeLine/LifeLine";
import Score from "./Score/Score";
import Quiz from "./Quiz/Quiz";

class QuizContainer extends Component {
    /**
     * Handles calling the right functions when an answer is clicked, depending
     * on if the answer was correct or incorrect
     */
    handleAnswerClick = event => {
        const { questions, counter } = this.props;
        const answer = event.currentTarget.name;

        //  If the answer was correct, we check if there's questions leftover
        if (answer === "true") {
            //  If there's no questions left, the user won the game
            if (counter === questions.length) {
                this.props.endGame({
                    message: "You won!",
                    lost: false
                });
            }
            //  Otherwise, we go to the next question
            else this.props.setNextQuestion();
        }
        //  If the answer was incorrect, the user lost the game
        else this.props.endGame({ message: "You lost", lost: true });
    };

    render() {
        const { counter, openModal, questions, seconds } = this.props;

        return (
            <div className="absolute-container" id="quiz-container">
                {/* Shows all levels/money, as well as highlighting the one the user is currently one */}
                <Score counter={counter} />

                <div id="quiz-column">
                    {/* Shows the countdown */}
                    <Timer seconds={seconds} />

                    {/* Actual questions/answers */}
                    <Quiz
                        handleAnswerClick={this.handleAnswerClick}
                        currentQuestion={questions[counter]}
                    />
                </div>

                {/* Lifelines (phone a robot, ask the audience, etc.) */}
                <LifeLine
                    answerOptions={questions[counter].answers}
                    openModal={openModal}
                />
            </div>
        );
    }
}

QuizContainer.propTypes = {
    counter: PropTypes.number,
    openModal: PropTypes.func,
    questions: PropTypes.array,
    seconds: PropTypes.number,
    setNextQuestion: PropTypes.func,
    endGame: PropTypes.func
};

export default QuizContainer;
