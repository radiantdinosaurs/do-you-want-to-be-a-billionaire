import React from "react";
import PropTypes from "prop-types";

function PhoneARobot(props) {
    const { correctAnswer } = props;

    return (
        <React.Fragment>
            <div className="speech-bubble">
                <p>{correctAnswer}</p>
            </div>
            <i className="fas fa-lg fa-robot" id="cool-robot" />
        </React.Fragment>
    );
}

PhoneARobot.propTypes = {
    correctAnswer: PropTypes.string
};

export default PhoneARobot;
