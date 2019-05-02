import React, { Component } from "react";
import PropTypes from "prop-types";
import AnswerOption from "./AnswerOption/AnswerOption.js";
import { TransitionGroup } from "react-transition-group";

class Quiz extends Component {
    render() {
        const { currentQuestion } = this.props;

        return (
            <TransitionGroup>
                {currentQuestion.answers.map(answer => {
                    return (
                        <AnswerOption
                            key={`answer_option_${answer.name}`}
                            answer={answer}
                            handleAnswerClick={this.props.handleAnswerClick}
                        />
                    );
                })}
            </TransitionGroup>
        );
    }
}

Answers.propTypes = {
    currentQuestion: PropTypes.object,
    handleAnswerClick: PropTypes.func
};

export default Quiz;
