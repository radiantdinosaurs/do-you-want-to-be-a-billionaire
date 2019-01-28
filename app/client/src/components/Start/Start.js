import React from 'react';
import PropTypes from 'prop-types';
import Fade from '../Transitions/Fade';

function Start(props) {
    return (
        <Fade in={props.showStart}>
            <div className='absolute-container'>
                <div id='start-container'>
                    <div id='start-title'>
                        Do You Want to Be a Billionaire? Do You Want to Be a
                        Billionaire?
                    </div>

                    <button id='start-button' onClick={props.onStartClick}>
                        {props.result ? (
                            <React.Fragment>
                                {props.result}
                                <br />
                                Start again?
                            </React.Fragment>
                        ) : (
                            'Start Game'
                        )}
                    </button>
                </div>
            </div>
        </Fade>
    );
}

Start.propTypes = {
    showStart: PropTypes.bool.isRequired,
    onStartClick: PropTypes.func.isRequired
};

export default Start;
