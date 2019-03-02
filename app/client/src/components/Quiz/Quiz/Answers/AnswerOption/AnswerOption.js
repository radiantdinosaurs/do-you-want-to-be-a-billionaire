import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
    const answerContent = props.answer.name;
    return (
        <button
            className="skew-button"
            name={props.answer.correct.toString()}
            id={answerContent}
            onClick={props.handleAnswerClick}
        >
            <span dangerouslySetInnerHTML={{ __html: answerContent }} />
        </button>
    );
}

AnswerOption.propTypes = {
    // answerType: PropTypes.string.isRequired,
    // answerContent: PropTypes.string.isRequired,
    // handleAnswerClick: PropTypes.func.isRequired
};

export default AnswerOption;
