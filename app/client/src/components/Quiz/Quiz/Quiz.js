import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer/Answer.js';
import Fade from '../../Transitions/Fade';

function Quiz(props) {
    return (
        <div id='quiz-card'>
            <p
                className='question'
                dangerouslySetInnerHTML={{ __html: props.question }}
            />

            {props.answerOptions.map((answer, keys) => {
                const answerContent = Object.values(answer);
                const answerType = Object.keys(answer);
                return (
                    <Answer
                        key={`answer_option_${keys}`}
                        answerContent={answerContent[0]}
                        answerType={answerType[0]}
                        onAnswerClick={props.onAnswerClick}
                    />
                );
            })}
        </div>
    );
}

Quiz.propTypes = {
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    onAnswerClick: PropTypes.func.isRequired
};

export default Quiz;
