import React from 'react'
import PropTypes from 'prop-types'

function Answer(props) {
    const answerContent = props.answerContent
    return (
        <label className="radio">
            <input
                type="radio"
                name={ answerContent }
                id={ props.answerContent }
                value={ props.answerType }
                onChange={ props.onAnswerClick }
            />
            { answerContent }
        </label>
    )
}

Answer.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    onAnswerClick: PropTypes.func.isRequired
}

export default Answer
