import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

function AskTheAudience(props) {
    const { askTheAudience } = props;
    return (
        <div style={{ width: '100%' }}>
            <p>{askTheAudience[0].answer}</p>
            <div>
                <Line
                    //  There's 15 questions total, so multiply the current level
                    //  number by it's weight of 100%
                    percent={askTheAudience[0].audience}
                    strokeWidth="2"
                    //  Yellow color
                    strokeColor="#f9df72"
                    trailColor="#FFFFFF"
                />
            </div>

            <p>{askTheAudience[1].answer}</p>
            <div>
                <Line
                    //  There's 15 questions total, so multiply the current level
                    //  number by it's weight of 100%
                    percent={askTheAudience[1].audience}
                    strokeWidth="2"
                    //  Yellow color
                    strokeColor="#f9df72"
                    trailColor="#FFFFFF"
                />
            </div>

            <p>{askTheAudience[2].answer}</p>
            <div>
                <Line
                    //  There's 15 questions total, so multiply the current level
                    //  number by it's weight of 100%
                    percent={askTheAudience[2].audience}
                    strokeWidth="2"
                    //  Yellow color
                    strokeColor="#f9df72"
                    trailColor="#FFFFFF"
                />
            </div>

            <p>{askTheAudience[3].answer}</p>
            <div>
                <Line
                    //  There's 15 questions total, so multiply the current level
                    //  number by it's weight of 100%
                    percent={askTheAudience[3].audience}
                    strokeWidth="2"
                    //  Yellow color
                    strokeColor="#f9df72"
                    trailColor="#FFFFFF"
                />
            </div>
        </div>
    );
}

AskTheAudience.propTypes = {
    askTheAudience: PropTypes.array
};

export default AskTheAudience;
