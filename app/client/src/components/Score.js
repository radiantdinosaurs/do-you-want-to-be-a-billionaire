import React from 'react'
import PropTypes from 'prop-types'
import Level from './Level'

function Score(props) {
    function getLevels(level) {
        const levelNumber = level.number
        const levelValue = level.value
        const levelSafe = level.safe
        const currentLevel = props.currentLevel.number === levelNumber
        const maxLevel = props.levels.length - 1 === levelNumber
        return (
            <Level
                key={ levelNumber }
                levelNumber={ levelNumber }
                levelValue={ levelValue }
                levelSafe={ levelSafe }
                currentLevel={ currentLevel }
                maxLevel={ maxLevel }
            />
        )
    }
    const levels = props.levels
    return (
        <div className="tile">
            <div className="card">
                <div className="card-content">
                    <table className="table">
                        { levels.map(getLevels) }
                    </table>
                </div>
            </div>
        </div>
    )
}

Score.propTypes = {
    levels: PropTypes.array.isRequired,
    currentLevel: PropTypes.object.isRequired
}

export default Score
