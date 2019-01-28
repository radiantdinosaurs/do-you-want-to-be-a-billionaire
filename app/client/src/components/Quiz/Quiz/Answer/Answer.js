import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
    const answerContent = props.answerContent;
    return (
        <button
            className='skew-button'
            name={answerContent}
            id={props.answerContent}
            onClick={props.onAnswerClick}
        >
            <span dangerouslySetInnerHTML={{ __html: answerContent }} />
        </button>
    );
}

Answer.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    onAnswerClick: PropTypes.func.isRequired
};

export default Answer;
