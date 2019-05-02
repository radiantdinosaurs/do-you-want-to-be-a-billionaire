import React, { Component } from "react";
import PropTypes from "prop-types";
import PhoneARobot from "./PhoneARobot/PhoneARobot";
import AskTheAudience from "./AskTheAudience/AskTheAudience";
import * as helper from "../../../helpers/lifelines";

class LifeLine extends Component {
    state = {
        //  Any of the state values below will be false if the user
        //  uses the life line
        askTheAudience: false,
        phoneARobot: false,
        split: false
    };

    /**
     * Handles when the user clicks on a life life, sending it to the right
     * function
     */
    onLifeLineClick = event => {
        const lifeLine = event.currentTarget.name;
        switch (lifeLine) {
            //  Phone a robot
            case "robot":
                this.onClickPhoneARobot();
                break;
            //  Ask the audience
            case "ask":
                this.onClickAskTheAudience();
                break;
            //  Remove two answers
            case "split":
                this.split();
        }
    };

    onClickPhoneARobot = () => {
        const { answerOptions } = this.props;
        //  Send off to the helper to get the correct answer
        const correctAnswer = helper.handlePhoningARobot(answerOptions);
        //  Mark that the life line has been used
        this.setUsedLifeLine("phoneARobot");
        //  Open the modal with the robot with answer displayed
        this.props.openModal(<PhoneARobot correctAnswer={correctAnswer} />);
    };

    onClickAskTheAudience = () => {
        const { answerOptions } = this.props;
        //  Send off to the helper to get the correct answer
        const askTheAudience = helper.handleAskingTheAudience(answerOptions);
        //  Mark that the life line has been used
        this.setUsedLifeLine("askTheAudience");
        //  Open the modal with the "audience" answers displayed
        this.props.openModal(
            <AskTheAudience askTheAudience={askTheAudience} />
        );
    };

    onClickSplit = () => {
        const { answerOptions } = this.props;
        //  Send off to the helper to shuffle/hide the answers
        helper.handleSplittingAnswers(answerOptions);
        //  Mark that the life line has been used
        this.setUsedLifeLine("split");
    };

    setUsedLifeLine = name => {
        this.setState({
            [name]: true
        });
    };

    render() {
        const { askTheAudience, split, phoneARobot } = this.state;
        return (
            <div id="lifeline-column">
                <button
                    disabled={askTheAudience}
                    name={"ask"}
                    id="ask"
                    onClick={this.onClickAskTheAudience}
                >
                    <i className="fas fa-lg fa-users" />
                </button>
                <button
                    name={"split"}
                    disabled={split}
                    onClick={this.onClickSplit}
                >
                    50:50
                </button>
                <button
                    disabled={phoneARobot}
                    name={"robot"}
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
