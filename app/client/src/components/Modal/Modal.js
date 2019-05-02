import React from "react";
import PropTypes from "prop-types";

function Modal(props) {
    return (
        <div id="modal-overlay">
            <div id="modal-container">
                <button onClick={props.closeModal} id="close-button">
                    <i className="fas fa-window-close" id="close_icon" />
                </button>
                {props.message}
            </div>
        </div>
    );
}

Modal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    message: PropTypes.node
};

export default Modal;
