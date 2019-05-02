import React from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

const duration = 300;

const defaultStyle = {
    position: "absolute",
    opacity: "0",
    bottom: "-10rem",
    left: "1rem",
    transition: `all ${duration}ms ease-in-out`
};

const transitionStyles = {
    entered: {
        bottom: "1rem",
        opacity: "1"
    }
};

const Snackbar = props => {
    const { show, message } = props.snackbar;

    return (
        <Transition
            in={show}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={duration}
        >
            {state => (
                <div
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                    className="snackbar"
                >
                    <p>{message}</p>
                </div>
            )}
        </Transition>
    );
};

Snackbar.propTypes = {
    in: PropTypes.bool,
    children: PropTypes.node
};

export default Snackbar;
