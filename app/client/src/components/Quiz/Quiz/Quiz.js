import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers/Answers';
import Question from './Question/Question.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnswerOption from './Answers/AnswerOption/AnswerOption';

class Quiz extends Component {
    render() {
        const { currentQuestion, counter } = this.props;

        return (
            <div id="quiz-card" style={{ overflow: 'hidden' }}>
                <Question question={currentQuestion.question} />
                <TransitionGroup>
                    {currentQuestion.answers.map(answer => {
                        return (
                            <CSSTransition
                                key={answer.name}
                                timeout={1000}
                                classNames="fade"
                            >
                                <AnswerOption
                                    key={`answer_option_${answer.name}`}
                                    answer={answer}
                                    handleAnswerClick={
                                        this.props.handleAnswerClick
                                    }
                                />
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
        );
    }
}

Quiz.propTypes = {
    counter: PropTypes.number,
    handleAnswerClick: PropTypes.func,
    currentQuestion: PropTypes.object
};

export default Quiz;
