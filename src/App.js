import React, { Component } from 'react'
import './App.css'
import 'bulma/css/bulma.css'
import fetch from 'node-fetch'
import Quiz from './components/Quiz.js'

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
            result: ''
        }
        this.onAnswerClick = this.onAnswerClick.bind(this)
    }
    componentDidMount() {
        this.fetchQuestions().then((data) => {
            let questions = data.results.map((question, currentIndex) => {
                let answers = []
                answers.push({ 'correct': this.parse(question.correct_answer) })
                question.incorrect_answers.forEach((answer) => answers.push({ 'incorrect': this.parse(answer) }))
                this.shuffle(answers)

                let parsedQuestion = this.parse(question.question)

                return {
                    'question': parsedQuestion,
                    'answers': answers
                }
            })
            this.setState({ questions: questions })
            this.setState({ question: questions[0].question, answerOptions: questions[0].answers })
        })
    }
    fetchQuestions() {
        return fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
            .then((response) => {
                return response.json()
            })
    }
    shuffle(array) {
        let currentIndex = array.length
        let temporaryValue
        let randomIndex
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }
    parse(sentence) {
        return sentence.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&shy;/g, '-')
            .replace(/&amp;/g, '&')
    }
    onAnswerClick(event) {
        const answer = event.currentTarget.value
        if (answer === 'correct') {
            this.updateCorrectCount()
            if (this.state.questionId < this.state.questions.length) setTimeout(() => this.setNextQuestion(), 300)
            else {
                console.log('Game ended')
            }
        } else {
            console.log('Game over')
            setTimeout(() => this.setNextQuestion(), 300)
        }
    }
    updateCorrectCount() {
        let currentCorrectCount = this.state.correct
        currentCorrectCount++
        this.setState({ correct: currentCorrectCount })
    }
    setNextQuestion() {
        const counter = this.state.counter + 1
        const questionId = this.state.questionId + 1
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.state.questions[counter].question,
            answerOptions: this.state.questions[counter].answers
        })
    }
    getResults() {
        console.log('Getting results...')
    }
    setResults() {
        console.log('Setting results...')
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <Quiz
                        answerOptions={ this.state.answerOptions }
                        questionId={ this.state.questionId }
                        question={ this.state.question }
                        questionTotal={ this.state.questions.length }
                        onAnswerClick={ this.onAnswerClick }
                    />
                </div>
            </section>
        )
    }
}

export default App
