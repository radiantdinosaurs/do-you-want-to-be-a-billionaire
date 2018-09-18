import React from 'react'
import PropTypes from 'prop-types'

function Level(props) {
    const levelNumber = props.levelNumber
    const levelValue = props.levelValue
    const levelSafe = props.levelSafe
    const currentLevel = props.currentLevel
    const maxLevel = props.maxLevel
    return (
        <tr className={'has-text-weight-bold ' +
            (currentLevel ? 'has-background-warning' : '') +
            (maxLevel ? 'has-background-grey-dark' : '') }>
            <td className={'is-6 ' +
                (maxLevel || levelSafe ? 'has-text-primary' : '')}>
                { levelNumber }
            </td>
            <td className={'is-6 ' +
                (maxLevel || levelSafe ? 'has-text-primary' : '')}>
                { levelValue }
            </td>
        </tr>
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
