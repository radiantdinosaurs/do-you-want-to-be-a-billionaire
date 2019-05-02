import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Question(props) {
    const { question } = props;

    return (
        <TransitionGroup>
            <CSSTransition
                key={`questions_${question}`}
                timeout={1000}
                classNames="fade"
            >
                <p
                    className="question"
                    dangerouslySetInnerHTML={{ __html: question }}
                />
            </CSSTransition>
        </TransitionGroup>
    );
}

Question.propTypes = {
    question: PropTypes.string
};

export default Question;
