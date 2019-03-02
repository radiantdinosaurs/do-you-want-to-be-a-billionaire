import React from 'react';
import PropTypes from 'prop-types';

function Level(props) {
    const levelNumber = props.levelNumber;
    const levelValue = props.levelValue;
    const levelSafe = props.levelSafe;
    const currentLevel = props.currentLevel;
    const maxLevel = props.maxLevel;

    return (
        <div className={`levels${currentLevel ? ' current-level' : ''}`}>
            <div
                className={`level-number${
                    maxLevel || levelSafe ? ' is-safe-level' : ''
                }`}
            >
                {levelNumber}
            </div>
            <div className={maxLevel || levelSafe ? 'is-safe-level' : ''}>
                {levelValue}
            </div>
        </div>
    );
}

Level.propTypes = {
    levelNumber: PropTypes.number.isRequired,
    levelValue: PropTypes.string.isRequired,
    levelSafe: PropTypes.bool.isRequired,
    currentLevel: PropTypes.bool.isRequired,
    maxLevel: PropTypes.bool.isRequired
};

export default Level;
