import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Question from "./Question/Question.js";
import AnswerOption from "./Answers/AnswerOption/AnswerOption";

function Quiz(props) {
    const { currentQuestion } = props;

    return (
        <div id="quiz-card">
            <Question question={currentQuestion.question} />
            <TransitionGroup>
                {currentQuestion.answers.map(answer => {
                    return (
                        <CSSTransition
                            key={`answer_option_animation_${answer.name}`}
                            timeout={1000}
                            classNames="fade"
                        >
                            <AnswerOption
                                answer={answer}
                                handleAnswerClick={props.handleAnswerClick}
                            />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

Quiz.propTypes = {
    currentQuestion: PropTypes.object,
    handleAnswerClick: PropTypes.func
};

export default Quiz;
