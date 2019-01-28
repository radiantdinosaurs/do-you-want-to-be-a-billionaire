import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer/Timer';
import LifeLine from './LifeLine/LifeLine';
import Score from './Score/Score';
import Quiz from './Quiz/Quiz';
import Fade from '../Transitions/Fade';

class QuizContainer extends Component {
    render() {
        const props = this.props;
        return (
            <Fade in={props.showQuiz}>
                <div className='absolute-container'>
                    <Score
                        load={props.showQuiz}
                        levels={props.levels}
                        currentLevel={props.currentLevel}
                    />

                    <div id='quiz-column'>
                        <Timer seconds={props.seconds} />
                        <Quiz
                            answerOptions={props.answerOptions}
                            questionId={props.questionId}
                            question={props.question}
                            questionTotal={props.questionTotal}
                            onAnswerClick={props.onAnswerClick}
                        />
                    </div>

                    <LifeLine
                        onLifeLineClick={props.onLifeLineClick}
                        askTheAudience={props.askTheAudience}
                        phoneARobot={props.phoneARobot}
                        split={props.split}
                    />
                </div>
            </Fade>
        );
    }
}

QuizContainer.propTypes = {
    showQuiz: PropTypes.bool.isRequired,
    //
    levels: PropTypes.array.isRequired,
    currentLevel: PropTypes.object.isRequired,
    onLifeLineClick: PropTypes.func.isRequired,
    seconds: PropTypes.number.isRequired,
    answerOptions: PropTypes.array.isRequired,
    questionId: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerClick: PropTypes.func.isRequired,
    askTheAudience: PropTypes.object,
    phoneARobot: PropTypes.string,
    split: PropTypes.bool
};

export default QuizContainer;
