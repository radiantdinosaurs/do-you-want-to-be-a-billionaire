import React from "react";
import PropTypes from "prop-types";
import Level from "./Level/Level";
import ProgressBar from "./ProgressBar/ProgressBar";

const levels = [
    { number: 0, value: "$1", safe: false },
    { number: 1, value: "$2", safe: false },
    { number: 2, value: "$3", safe: false },
    { number: 3, value: "$4", safe: false },
    { number: 4, value: "$5", safe: true },
    { number: 5, value: "$7", safe: false },
    { number: 6, value: "$10", safe: false },
    { number: 7, value: "$12", safe: false },
    { number: 8, value: "$15", safe: false },
    { number: 9, value: "$25", safe: true },
    { number: 10, value: "$50", safe: true },
    { number: 11, value: "$100", safe: true },
    { number: 12, value: "$250", safe: true },
    { number: 13, value: "$500", safe: true },
    { number: 14, value: "$1,000,000,000", safe: true }
];

function Score(props) {
    // Gets all level items (e.g, $1,000,000,000)
    function getLevels(level) {
        const current = levels[props.counter];
        const levelNumber = level.number;
        const levelValue = level.value;
        const levelSafe = level.safe;
        const currentLevel = current.number === levelNumber;

        const maxLevel = levels.length - 1 === levelNumber;
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
    const current = levels[props.counter];
    return (
        <div id="levels-column">
            <div id="levels-card">{levels.map(getLevels)}</div>
            {/* Hide on desktop */}
            <ProgressBar
                currentLevel={current.number}
                maxLevel={levels.length}
                currentValue={current.value}
            />
        </div>
    );
}

Score.propTypes = {
    counter: PropTypes.number
    // levels: PropTypes.array.isRequired
    // currentLevel: PropTypes.object.isRequired
};

export default Score;
