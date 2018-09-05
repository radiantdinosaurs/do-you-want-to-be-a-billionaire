import React from 'react'
import PropTypes from 'prop-types'

function Answer(props) {
    const answerContent = props.answerContent
    return (
        <div className="column">
            <a
                className="button is-primary is-fullwidth"
                name={ answerContent }
                id={ props.answerContent }
                onClick={ props.onAnswerClick }
            >
                { answerContent }
            </a>
        </div>
    )
}

Answer.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    onAnswerClick: PropTypes.func.isRequired
}

export default Answer
