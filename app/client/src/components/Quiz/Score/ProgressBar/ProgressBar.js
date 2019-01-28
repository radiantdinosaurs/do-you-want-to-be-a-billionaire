import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar(props) {
    const currentLevel = props.currentLevel;
    const maxLevel = props.maxLevel;

    return (
        <div className='position-relative' style={{ width: '100%' }}>
            <progress
                className='progress'
                value={currentLevel}
                max={maxLevel}
            />
        </div>
    );
}

ProgressBar.propTypes = {
    currentValue: PropTypes.string.isRequired,
    levelNumber: PropTypes.number.isRequired,
    levelValue: PropTypes.string.isRequired,
    levelSafe: PropTypes.bool.isRequired,
    currentLevel: PropTypes.bool.isRequired,
    maxLevel: PropTypes.bool.isRequired
};

export default ProgressBar;
