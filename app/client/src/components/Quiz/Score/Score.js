import React from 'react';
import PropTypes from 'prop-types';
import Level from './Level/Level';
import ProgressBar from './ProgressBar/ProgressBar';

function Score(props) {
    // Gets all level items (e.g, $1,000,000,000)
    function getLevels(level) {
        const levelNumber = level.number;
        const levelValue = level.value;
        const levelSafe = level.safe;
        const currentLevel = props.currentLevel.number === levelNumber;
        const maxLevel = props.levels.length - 1 === levelNumber;
        return (
            <Level
                key={levelNumber}
                levelNumber={levelNumber}
                levelValue={levelValue}
                levelSafe={levelSafe}
                currentLevel={currentLevel}
                maxLevel={maxLevel}
            />
        );
    }
    return (
        <div id='levels-column'>
            <div id='levels-card'>
                {props.levels.map(getLevels)}

                {/* Hide on desktop */}
                <div style={{ width: '100%', display: 'none' }}>
                    <ProgressBar
                        currentLevel={props.currentLevel.number}
                        maxLevel={props.levels.length}
                        currentValue={props.currentLevel.value}
                    />
                </div>
            </div>
        </div>
    );
}

Score.propTypes = {
    levels: PropTypes.array.isRequired,
    currentLevel: PropTypes.object.isRequired
};

export default Score;
