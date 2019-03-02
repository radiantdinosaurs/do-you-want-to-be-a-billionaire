import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

function ProgressBar(props) {
    const { currentLevel } = props;

    return (
        <div className="progress-container">
            <Line
                //  There's 15 questions total, so multiply the current level
                //  number by it's weight of 100%
                percent={currentLevel * 6.66666666667}
                strokeWidth="3"
                //  Yellow color
                strokeColor="#f9df72"
                trailColor="#FFFFFF"
            />
        </div>
    );
}

ProgressBar.propTypes = {
    currentLevel: PropTypes.number
};

export default ProgressBar;
