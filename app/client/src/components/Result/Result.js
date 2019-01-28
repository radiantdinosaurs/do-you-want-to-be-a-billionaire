import React from 'react';
import PropTypes from 'prop-types';
import Fade from '../Transitions/Fade';

function Result(props) {
    function reload() {
        window.location.reload();
    }

    const glowingColor =
        props.result && props.result.includes('lost') ? 'you-lost' : 'you-won';

    return (
        <Fade in={props.result}>
            <div className='absolute-container'>
                <div id='start-container'>
                    <div id='start-title'>
                        Do You Want to Be a Billionaire? Do You Want to Be a
                        Billionaire?
                    </div>

                    <button
                        className={props.result ? glowingColor : ''}
                        id='start-button'
                        onClick={reload}
                    >
                        {props.result}
                        <br />
                        Start again?
                    </button>
                </div>
            </div>
        </Fade>
    );
}

Result.propTypes = {
    result: PropTypes.string.isRequired
};

export default Result;
