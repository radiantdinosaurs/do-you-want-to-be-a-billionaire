import React from 'react'
import PropTypes from 'prop-types'

function Question(props) {
    return (
        <h2 className="question">{ props.question }</h2>
    )
}

Question.propTypes = {
    question: PropTypes.string.isRequired
}

export default Question
