import React from 'react';
import PropTypes from 'prop-types';

function Timer(props) {
    return <div id='timer'>{props.seconds}</div>;
}

Timer.propTypes = {
    seconds: PropTypes.number.isRequired
};

export default Timer;
