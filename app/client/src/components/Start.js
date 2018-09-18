import React from 'react'
import PropTypes from 'prop-types'

function Start(props) {
    return (
        <div className="tile is-ancestor is-vertical is-12 is-vcentered">
            <div className="is-parent has-text-centered is-vcentered">
                <h3 className="title is-3">Do You Want to Be a Billionaire?</h3>
                <a className="button is-primary" id="start-button" onClick={ props.onStartClick }>Start Game</a>
            </div>
        </div>
    )
}

Start.propTypes = {
    onStartClick: PropTypes.func.isRequired
}

export default Start
