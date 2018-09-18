import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import 'bulma/css/bulma.css'
import Quiz from './components/Quiz.js'
import Result from './components/Result.js'
import Score from './components/Score'

class App extends Component {
    constructor() {
        super()
        this.state = {
            questions: [],
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            correct: 0,
            result: '',
            levels: [],
            currentLevel: {},
            safeLevel: {}
        }
        this.onAnswerClick = this.onAnswerClick.bind(this)
    }
    componentDidMount() {
        this.handleSession()
        this.fetchTriviaQuestions().then((response) => {
            const questions = response.questions
            this.setState({
                questions: questions,
                question: questions[0].question,
                answerOptions: questions[0].answers,
                currentLevel: this.props.levels[0],
                safeLevel: this.props.levels[0]
            })
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }
    handleSession() {
        fetch(`https://opentdb.com/api_token.php?command=request`).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.token) localStorage.setItem('token', response.token)
            else throw new Error('Token was not fetched successfully.')
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }
    fetchTriviaQuestions() {
        const token = localStorage.getItem('token')
        const options = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ 'token': token })
        }
        return fetch('/api/v1/trivia', options).then((response) => {
            return response.json()
        })
    }

    onAnswerClick(event) {
        const answer = String(event.currentTarget.name)
        let c = false
        this.state.answerOptions.forEach((element) => {
            if (element.correct === answer) {
                c = true
            }
        })
        if (c) {
            if (this.state.questionId < this.state.questions.length) setTimeout(() => this.setNextQuestion(), 300)
            else {
                let result = 'You won!'
                this.setResults(result)
            }
        } else {
            let result = 'Incorrect answer. You lost.'
            this.setResults(result)
        }
    }
    setNextQuestion() {
        const correct = this.state.correct + 1
        const counter = this.state.counter + 1
        const questionId = this.state.questionId + 1
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.state.questions[counter].question,
            answerOptions: this.state.questions[counter].answers,
            correct: correct,
            currentLevel: this.props.levels[counter]
        })
    }
    setResults(result) {
        this.setState({ result: result })
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="tile is-ancestor is-vertical">
                        <div className="tile is-parent is-4">
                            <Score
                                levels={ this.props.levels }
                                currentLevel={ this.state.currentLevel }
                            />
                        </div>
                        <div className="tile is-parent">
                            {!this.state.result &&
                                <Quiz
                                    answerOptions={ this.state.answerOptions }
                                    questionId={ this.state.questionId }
                                    question={ this.state.question }
                                    questionTotal={ this.state.questions.length }
                                    onAnswerClick={ this.onAnswerClick }
                                />
                            }
                            {this.state.result &&
                                <Result
                                    result={ this.state.result }
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

App.defaultProps = {
    levels: [
        { number: 0, value: '$1', safe: false },
        { number: 1, value: '$2', safe: false },
        { number: 2, value: '$3', safe: false },
        { number: 3, value: '$4', safe: false },
        { number: 4, value: '$5', safe: true },
        { number: 5, value: '$7', safe: false },
        { number: 6, value: '$10', safe: false },
        { number: 7, value: '$12', safe: false },
        { number: 8, value: '$15', safe: false },
        { number: 9, value: '$25', safe: true },
        { number: 10, value: '$50', safe: true },
        { number: 11, value: '$100', safe: true },
        { number: 12, value: '$250', safe: true },
        { number: 13, value: '$500', safe: true },
        { number: 14, value: '$1,000,000,000', safe: true }
    ]
}

App.propTypes = {
    levels: PropTypes.array.isRequired
}

export default App
