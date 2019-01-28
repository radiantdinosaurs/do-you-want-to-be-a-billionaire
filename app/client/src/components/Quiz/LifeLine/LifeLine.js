import React from 'react';
import PropTypes from 'prop-types';

function LifeLine(props) {
    return (
        <div id='lifeline-column'>
            <button
                disabled={props.askTheAudience.length}
                name={'ask'}
                id='ask'
                onClick={props.onLifeLineClick}
            >
                <i className='fas fa-lg fa-users' />
            </button>
            <button
                name={'split'}
                disabled={props.split}
                onClick={props.onLifeLineClick}
            >
                50:50
            </button>
            <button
                disabled={props.phoneARobot.length}
                name={'robot'}
                onClick={props.onLifeLineClick}
            >
                <i className='fas fa-lg fa-robot' />
            </button>
        </div>
    );
}

LifeLine.propTypes = {
    onLifeLineClick: PropTypes.func.isRequired,
    askTheAudience: PropTypes.object,
    phoneARobot: PropTypes.string,
    split: PropTypes.bool
};

export default LifeLine;
