/******************************
 * Dependencies
 *****************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CircleType from 'circletype';

/******************************
 * Components
 *****************************/

import Start from './components/Start/Start';
import Quiz from './components/Quiz/QuizContainer';
import Result from './components/Result/Result';
import Background from './components/Background/Background';

/******************************
 * Helper functions
 *****************************/

import * as request from './helpers/requests';
import * as documentManipulation from './helpers/documentManipulation';

/******************************
 * App
 *****************************/

Modal.setAppElement('#root');

class App extends Component {
    constructor() {
        super();
        this.state = {
            showStart: true,
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
            safeLevel: {},
            askTheAudience: {},
            phoneARobot: '',
            split: false,
            modalMessage: 'hey',
            modalIsOpen: false
        };
        this.onAnswerClick = this.onAnswerClick.bind(this);
        this.onStartClick = this.onStartClick.bind(this);
        this.onLifeLineClick = this.onLifeLineClick.bind(this);
        this.countDown = this.countDown.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        // Curve the title into a circle
        (() => new CircleType(document.getElementById('start-title')))();

        // If there's no existing session, get a session
        if (!sessionStorage.getItem('token')) {
            request.getSession();
        }
    }

    //

    // Handle when the user clicks on the start button
    onStartClick() {
        documentManipulation.animateStartButton();
        request
            .fetchTrivia()
            .then(response => {
                const questions = response.questions;
                this.setState({
                    questions: questions,
                    question: questions[0].question,
                    answerOptions: questions[0].answers,
                    currentLevel: this.props.levels[0],
                    safeLevel: this.props.levels[0],
                    showQuiz: true,
                    seconds: this.props.seconds,
                    showStart: false
                });
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }

    startTimer() {
        // setInterval(this.countDown, 1000);
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: seconds,
            seconds: seconds
        });
        if (seconds === 0) {
            let result = 'Time up! You lost.';
            this.setState({ result: result, showQuiz: false });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onAnswerClick(event) {
        const selectedAnswer = String(event.currentTarget.name);
        let answerIsCorrect = false;
        this.state.answerOptions.forEach(answer => {
            if (answer.correct === selectedAnswer) answerIsCorrect = true;
        });
        if (answerIsCorrect) {
            if (this.state.questionId < this.state.questions.length) {
                this.setNextQuestion();
            } else {
                let result = 'You won!';
                this.setState({ showQuiz: false, result: result });
            }
        } else {
            let result = 'You lost.';

            this.setState({ result: result, showQuiz: false });
        }
    }

    setNextQuestion() {
        const correct = this.state.correct + 1;
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.state.questions[counter].question,
            answerOptions: this.state.questions[counter].answers,
            correct: correct,
            currentLevel: this.props.levels[counter],
            seconds: 30
        });
    }

    onLifeLineClick(event) {
        const selectedLifeLine = event.currentTarget.name;
        switch (selectedLifeLine) {
            case 'robot':
                this.phoneARobot();
                this.openModal();
                break;
            case 'ask':
                this.askTheAudience();
                this.openModal();
                break;
            case 'split':
                this.split();
        }
    }

    split() {
        const answerOptions = this.state.answerOptions;
        let answersRemoved = 0;
        answerOptions.forEach(answer => {
            if (answersRemoved < 2) {
                if (!answer.correct) {
                    document.getElementById(answer.incorrect).remove();
                    answersRemoved++;
                }
            }
        });
        this.setState({ split: true });
    }

    askTheAudience() {
        const answerOptions = this.state.answerOptions;
        let askTheAudience = [];
        answerOptions.forEach(answer => {
            if (answer.correct) {
                const percent = Math.floor(Math.random() * (89 - 50) + 50);
                askTheAudience.push({
                    answer: answer.correct,
                    audience: percent
                });
            } else {
                const percent = Math.floor(Math.random() * (45 - 10) + 10);
                askTheAudience.push({
                    answer: answer.incorrect,
                    audience: percent
                });
            }
        });
        let element = (
            <div style={{ width: '100%' }}>
                <p>{askTheAudience[0].answer}</p>
                <progress
                    className='progress'
                    value={askTheAudience[0].audience}
                    max={100}
                />
                <p>{askTheAudience[1].answer}</p>
                <progress
                    className='progress'
                    value={askTheAudience[1].audience}
                    max={100}
                />
                <p>{askTheAudience[2].answer}</p>
                <progress
                    className='progress'
                    value={askTheAudience[2].audience}
                    max={100}
                />
                <p>{askTheAudience[3].answer}</p>
                <progress
                    className='progress'
                    value={askTheAudience[3].audience}
                    max={100}
                />
            </div>
        );
        this.setState({
            askTheAudience: askTheAudience,
            modalMessage: element
        });
    }

    phoneARobot() {
        const answerOptions = this.state.answerOptions;
        let correctAnswer;
        answerOptions.forEach(answer => {
            if (answer.correct) {
                let a =
                    'Hmmmm...I think the right answer is ' +
                    answer.correct +
                    '!';
                correctAnswer = a;
            }
        });
        let element = (
            <div style={{ width: '100%' }}>
                <div className='speech-bubble'>
                    <p>{correctAnswer}</p>
                </div>
                <i className='fas fa-lg fa-robot' id='cool-robot' />
            </div>
        );
        this.setState({ phoneARobot: correctAnswer, modalMessage: element });
    }

    render() {
        const customStyles = {
            content: {
                backgroundColor: '#0e1424',
                color: '#FFFFFF',
                top: '140px',
                left: '50px',
                bottom: '140px',
                right: '50px',
                borderRadius: '1rem',
                border: '4px solid #FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem'
            },
            overlay: {
                zIndex: 10,
                backgroundColor: 'rgba(14, 20, 36, .75)'
            }
        };

        return (
            <div id='content-container'>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel='Example Modal'
                    style={customStyles}
                >
                    <button onClick={this.closeModal} id='close-button'>
                        <i className='fas fa-window-close' id='close_icon' />
                    </button>
                    <div className='modal-content'>
                        {this.state.modalMessage}
                    </div>
                </Modal>

                <Background />

                <Start
                    onStartClick={this.onStartClick}
                    showStart={this.state.showStart}
                />

                <Quiz
                    levels={this.props.levels}
                    currentLevel={this.state.currentLevel}
                    onLifeLineClick={this.onLifeLineClick}
                    seconds={this.state.seconds}
                    answerOptions={this.state.answerOptions}
                    questionId={this.state.questionId}
                    question={this.state.question}
                    questionTotal={this.state.questions.length}
                    onAnswerClick={this.onAnswerClick}
                    askTheAudience={this.state.askTheAudience}
                    phoneARobot={this.state.phoneARobot}
                    split={this.state.split}
                    showQuiz={this.state.showQuiz}
                />

                {!this.state.showQuiz && this.state.result && (
                    <Result result={this.state.result} />
                )}
            </div>
        );
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
};

App.propTypes = {
    levels: PropTypes.array.isRequired,
    seconds: PropTypes.number.isRequired
};

export default App;
