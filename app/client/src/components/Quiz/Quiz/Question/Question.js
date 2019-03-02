import React from 'react';
import PropTypes from 'prop-types';
import Fade from '../../../Transitions/Fade';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Question(props) {
    return (
        <TransitionGroup>
            <CSSTransition
                key={`questions_${props.question}`}
                timeout={1000}
                classNames="fade"
            >
                <p
                    className="question"
                    dangerouslySetInnerHTML={{ __html: props.question }}
                />
            </CSSTransition>
        </TransitionGroup>
    );
}

export default Question;
