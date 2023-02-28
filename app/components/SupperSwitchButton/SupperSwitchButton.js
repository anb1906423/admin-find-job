import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from './SupperSwitchButton.module.scss';

const cx = classNames.bind(styles);

function SupperSwitchButton({ buttonArray, onButtonClick }) {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    function handleClick(index) {
        setActiveButtonIndex(index);
        onButtonClick(index);
    }

    return (
        <div className={cx('wp-btn-switch')}>
            {buttonArray.map((title, index) => {
                const id = uuidv4();

                return (
                    <button
                        key={index}
                        className={`${activeButtonIndex === index ? 'btn btn-warning' : 'btn btn-primary'}`}
                        onClick={() => handleClick(index)}
                    >
                        {title}
                    </button>
                );
            })}
        </div>
    );
}

SupperSwitchButton.propTypes = {
    buttonArray: PropTypes.array.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

export default memo(SupperSwitchButton);
