import React, { Component } from "react";
import PropTypes from "prop-types";
import CircleType from "circletype";
import * as documentManipulation from "../../helpers/documentManipulation";

class Splash extends Component {
    state = {
        //  Loading starts off true so we can handle curving the title before
        //  the user can see it
        loading: true
    };

    componentDidMount() {
        //  TODO: Right now, I'm using `setTimeout` before curving the title,
        //  but this is a bug to solve
        setTimeout(
            () => new CircleType(document.getElementById("start-title")),
            300
        );
        //  After a second of loading, show the start screen
        setTimeout(() => this.setLoading(false), 500);
    }

    /**
     * Handles actions needed when the user clicks to start a game
     */
    onStartClick = () => {
        //  Start spinning the start button
        documentManipulation.animateStartButtonOnClick();
        //  Begin work on starting the same
        this.props.startGame();
    };

    setLoading = loading => {
        this.setState({ loading: loading });
    };

    render() {
        const { result } = this.props;
        const { loading } = this.state;
        let glowingColor = "";
        let textColor = "";

        //  Handle changing the text color if the game has ended
        if (result) {
            glowingColor = result && result.lost ? "you-lost" : "you-won";
            textColor = result && result.lost ? "lost" : "won";
        }

        return (
            <div
                className="absolute-container"
                style={{
                    //  Until finished loading, we're hiding this container and
                    //  its content
                    opacity: loading ? "0" : 1,
                    transition: "opacity 1s ease-in"
                }}
            >
                <div id="start-container">
                    <div id="start-title" className={textColor}>
                        Do You Want to Be a Billionaire?&nbsp;Do You Want to Be
                        a Billionaire?&nbsp;
                    </div>

                    <button
                        id="start-button"
                        className={glowingColor}
                        onClick={this.onStartClick}
                    >
                        {result ? (
                            <React.Fragment>
                                {result.message}
                                <br />
                                <br />
                                Start again?
                            </React.Fragment>
                        ) : (
                            <React.Fragment>Start Game</React.Fragment>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

Splash.propTypes = {
    result: PropTypes.object,
    startGame: PropTypes.func
};

export default Splash;
