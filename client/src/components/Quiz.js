import React from 'react'
import PropTypes from 'prop-types'
import Answer from './Answer.js'
import Question from './Question.js'

function Quiz(props) {
    function getAnswerOptions(answer) {
        const key = Object.values(answer)
        const answerContent = Object.values(answer)
        const answerType = Object.keys(answer)
        return (
            <Answer
                key={ key[0] }
                answerContent={ answerContent[0] }
                answerType={ answerType[0] }
                onAnswerClick={ props.onAnswerClick }
            />
        )
    }
    return (
        <div className="tile is-child card" key={ props.questionId }>
            <Question question={ props.question } />
            <div className="card-content">
                <div className="content">
                    <div className="columns">
                        { props.answerOptions.map(getAnswerOptions) }
                    </div>
                </div>
            </div>
        </div>
    )
}

Quiz.propTypes = {
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    // questionTotal: React.PropTypes.number.isRequired,
    onAnswerClick: PropTypes.func.isRequired
}

export default Quiz
