import React from 'react'
import PropTypes from 'prop-types'

function Result(props) {
    return (
        <div>
            { props.result }<a href='/'> Try again?</a>
        </div>
    )
}

Result.propTypes = {
    result: PropTypes.string.isRequired
}

export default Result
