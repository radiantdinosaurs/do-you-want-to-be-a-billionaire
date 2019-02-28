import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const MySlide = props => {
    return (
        <Slide direction="up" in={props.in} mountOnEnter unmountOnExit>
            {props.children}
        </Slide>
    );
};

MySlide.propTypes = {
    in: PropTypes.bool,
    children: PropTypes.node
};

export default MySlide;
