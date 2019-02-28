import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhoneARobot from './PhoneARobot/PhoneARobot';
import AskTheAudience from './AskTheAudience/AskTheAudience';

class LifeLine extends Component {
    state = {
        askTheAudience: false,
        phoneARobot: false,
        split: false
    };

    onLifeLineClick = event => {
        const lifeLine = event.currentTarget.name;
        switch (lifeLine) {
            case 'robot':
                this.onClickPhoneARobot();
                break;
            case 'ask':
                this.onClickAskTheAudience();
                break;
            case 'split':
                this.split();
        }
    };

    onClickPhoneARobot = () => {
        const { answerOptions } = this.props;
        const quotes = [
            'Hmmmm...I think the right answer is ',
            'I know! The answer is ',
            'You should definitely choose this answer: '
        ];
        let correctAnswer;

        answerOptions.forEach(answer => {
            if (answer.correct) {
                let quote = quotes[Math.floor(Math.random() * quotes.length)];
                correctAnswer = `${quote}${answer.name}`;
            }
        });

        this.setState({ phoneARobot: true });
        this.props.openModal(<PhoneARobot correctAnswer={correctAnswer} />);
    };

    onClickAskTheAudience = () => {
        const { answerOptions } = this.props;
        let askTheAudience = [];

        answerOptions.forEach(answer => {
            if (answer.correct) {
                const percent = Math.floor(Math.random() * (89 - 50) + 50);
                askTheAudience.push({
                    answer: answer.name,
                    audience: percent
                });
            } else {
                const percent = Math.floor(Math.random() * (45 - 10) + 10);
                askTheAudience.push({
                    answer: answer.name,
                    audience: percent
                });
            }
        });

        this.setState({ askTheAudience: true });
        this.props.openModal(
            <AskTheAudience askTheAudience={askTheAudience} />
        );
    };

    onClickSplit = () => {
        const { answerOptions } = this.props;
        let answersRemoved = 0;
        this.shuffle(answerOptions);

        answerOptions.forEach(answer => {
            if (answersRemoved < 2) {
                if (!answer.correct) {
                    document.getElementById(answer.name).style.opacity = '0';
                    answersRemoved++;
                }
            }
        });
        this.setState({ split: true });
    };

    shuffle = array => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    render() {
        const { askTheAudience, split, phoneARobot } = this.state;
        return (
            <div id="lifeline-column">
                <button
                    disabled={askTheAudience}
                    name={'ask'}
                    id="ask"
                    onClick={this.onClickAskTheAudience}
                >
                    <i className="fas fa-lg fa-users" />
                </button>
                <button
                    name={'split'}
                    disabled={split}
                    onClick={this.onClickSplit}
                >
                    50:50
                </button>
                <button
                    disabled={phoneARobot}
                    name={'robot'}
                    onClick={this.onClickPhoneARobot}
                >
                    <i className="fas fa-lg fa-robot" />
                </button>
            </div>
        );
    }
}

LifeLine.propTypes = {
    openModal: PropTypes.func,
    answerOptions: PropTypes.array
};

export default LifeLine;
