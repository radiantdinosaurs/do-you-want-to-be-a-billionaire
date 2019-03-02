import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleType from 'circletype';
import * as documentManipulation from '../../helpers/documentManipulation';

class Splash extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        // Curve the title into a circle
        setTimeout(
            () => new CircleType(document.getElementById('start-title')),
            300
        );
        // After a second of loading, show the start screen
        setTimeout(() => this.setState({ loading: false }), 500);
    }

    // Handle when the user clicks on the start button
    onStartClick = event => {
        event.preventDefault();
        documentManipulation.animateStartButtonOnClick();
        this.props.getQuestions();
    };

    render() {
        const { result } = this.props;
        const { loading } = this.state;
        let glowingColor = '';
        let textColor = '';

        // Handle changing the text color if the game has ended
        if (result) {
            glowingColor = result && result.lost ? 'you-lost' : 'you-won';
            textColor = result && result.lost ? 'lost' : 'won';
        }

        return (
            <div
                className="absolute-container"
                style={{
                    opacity: loading ? '0' : 1,
                    transition: 'opacity 2s'
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
    showSplash: PropTypes.bool.isRequired,
    getQuestions: PropTypes.func.isRequired
};

export default Splash;
