import React from 'react'
import PropTypes from 'prop-types'

function Question(props) {
    return (
        <header className="card-header">
            <p className="card-header-title">
                { props.question }
            </p>
        </header>
    )
}

Question.propTypes = {
    question: PropTypes.string.isRequired
}

export default Question
