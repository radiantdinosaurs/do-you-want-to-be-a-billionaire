import React, { Component } from "react";
import PropTypes from "prop-types";
import Timer from "./Timer/Timer";
import LifeLine from "./LifeLine/LifeLine";
import Score from "./Score/Score";
import Quiz from "./Quiz/Quiz";

class QuizContainer extends Component {
    state = {
        currentQuestion: {}
    };

    componentWillMount() {
        this.setQuestion();
    }

    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter) this.setQuestion();
    }

    setQuestion = () => {
        const { counter, questions } = this.props;
        this.setState({
            currentQuestion: questions[counter]
        });
    };

    handleAnswerClick = event => {
        const { questions, counter } = this.props;
        const value = event.currentTarget.name;
        if (value === "true") {
            counter < questions.length - 1
                ? this.props.setNextQuestion()
                : this.props.setResult({
                      message: "You won!",
                      lost: false
                  });
        } else this.props.setResult({ message: "You lost", lost: true });
    };

    render() {
        const { counter, seconds, openModal } = this.props;
        const { currentQuestion } = this.state;

        return (
            <div className="absolute-container" id="quiz-container">
                <Score counter={counter} />

                <div id="quiz-column">
                    <Timer seconds={seconds} />
                    <Quiz
                        counter={counter}
                        handleAnswerClick={this.handleAnswerClick}
                        currentQuestion={currentQuestion}
                    />
                </div>

                <LifeLine
                    // Using answer options for all lifelines
                    answerOptions={currentQuestion.answers}
                    // Used to show lifelines in modal
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
    setResult: PropTypes.func
};

export default QuizContainer;
