import React from 'react'
import PropTypes from 'prop-types'

function Level(props) {
    const levelNumber = props.levelNumber
    const levelValue = props.levelValue
    const levelSafe = props.levelSafe
    const currentLevel = props.currentLevel
    const maxLevel = props.maxLevel
    return (
        <div
            className={
                'columns ' +
                (currentLevel ? 'has-background-warning' : '') +
                (maxLevel ? 'has-background-grey-dark' : '') }
        >
            <div className="column is-1">
                <p
                    className={ 'has-text-weight-bold ' +
                    (maxLevel || levelSafe ? 'has-text-warning' : '')}>
                    { levelNumber }
                </p>
            </div>
            <div className="column">
                <p
                    className={ 'has-text-weight-bold ' +
                    (maxLevel || levelSafe ? 'has-text-warning' : '')}>
                    { levelValue }
                </p>
            </div>
        </div>
    )
}

Level.propTypes = {
    levelNumber: PropTypes.number.isRequired,
    levelValue: PropTypes.string.isRequired,
    levelSafe: PropTypes.bool.isRequired,
    currentLevel: PropTypes.bool.isRequired,
    maxLevel: PropTypes.bool.isRequired
}

export default Level
