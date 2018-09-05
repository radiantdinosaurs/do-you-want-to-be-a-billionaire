import React from 'react'
import PropTypes from 'prop-types'
import './Score.css'
import Level from './Level.js'

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
        <div className="tile is-child has-background-white-ter">
            <div className="card">
                <div className="card-content">
                    { levels.map(getLevels) }
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
