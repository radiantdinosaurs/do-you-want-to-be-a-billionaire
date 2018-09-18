import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import 'bulma/css/bulma.css'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Score from './components/Score'
import Start from './components/Start'
import Timer from './components/Timer'

class App extends Component {
    constructor() {
        super()
        this.state = {
            showQuiz: false,
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
        this.onStartClick = this.onStartClick.bind(this)
        this.countDown = this.countDown.bind(this)
    }
    componentDidMount() {
        const token = sessionStorage.getItem('token')
        if (!token) this.getSession()
    }
    getSession() {
        fetch(`https://opentdb.com/api_token.php?command=request`).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.token) sessionStorage.setItem('token', response.token)
            else console.log(new Error('Error: Token was not fetched successfully.'))
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }
    onStartClick() {
        const startButton = document.getElementById('start-button')
        startButton.classList.add('is-loading')
        this.startGame()
    }
    startGame() {
        this.fetchTrivia().then((response) => {
            const questions = response.questions
            this.setState({
                questions: questions,
                question: questions[0].question,
                answerOptions: questions[0].answers,
                currentLevel: this.props.levels[0],
                safeLevel: this.props.levels[0],
                showQuiz: true,
                seconds: this.props.seconds
            })
            this.startTimer()
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }
    fetchTrivia() {
        const token = sessionStorage.getItem('token')
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
    startTimer() {
        setInterval(this.countDown, 1000)
    }
    countDown() {
        let seconds = this.state.seconds - 1
        this.setState({
            time: seconds,
            seconds: seconds
        })
        if (seconds === 0) {
            let result = 'Time up! You lost.'
            this.setState({ result: result, showQuiz: false })
        }
    }
    onAnswerClick(event) {
        const selectedAnswer = String(event.currentTarget.name)
        let answerIsCorrect = false
        this.state.answerOptions.forEach((answer) => {
            if (answer.correct === selectedAnswer) answerIsCorrect = true
        })
        if (answerIsCorrect) {
            if (this.state.questionId < this.state.questions.length) {
                setTimeout(() => this.setNextQuestion(), 300)
            } else {
                let result = 'You won!'
                this.setState({ showQuiz: false, result: result })
            }
        } else {
            let result = 'Incorrect answer. You lost.'
            this.setState({ result: result, showQuiz: false })
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
            currentLevel: this.props.levels[counter],
            seconds: 30
        })
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    {!this.state.showQuiz && !this.state.result &&
                        <Start
                            onStartClick={ this.onStartClick }
                        />
                    }
                    {this.state.showQuiz &&
                        <div className="tile is-ancestor is-vertical">
                            <div className="tile is-12">
                                <div className="tile is-parent">
                                    <Score
                                        levels={ this.props.levels }
                                        currentLevel={ this.state.currentLevel }
                                    />
                                </div>
                                <div className="tile is-parent">
                                    <Timer
                                        seconds={ this.state.seconds }
                                    />
                                </div>
                                <div className="tile is-parent">
                                </div>
                            </div>
                            <div className="tile is-parent is-12">
                                <Quiz
                                    answerOptions={ this.state.answerOptions }
                                    questionId={ this.state.questionId }
                                    question={ this.state.question }
                                    questionTotal={ this.state.questions.length }
                                    onAnswerClick={ this.onAnswerClick }
                                />
                            </div>
                        </div>
                    }
                    {!this.state.showQuiz && this.state.result &&
                        <Result
                            result={ this.state.result }
                        />
                    }
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
    ],
    seconds: 30
}

App.propTypes = {
    levels: PropTypes.array.isRequired,
    seconds: PropTypes.number.isRequired
}

export default App
