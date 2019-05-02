import React from "react";
import PropTypes from "prop-types";

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
    answer: PropTypes.object,
    handleAnswerClick: PropTypes.func
};

export default AnswerOption;
