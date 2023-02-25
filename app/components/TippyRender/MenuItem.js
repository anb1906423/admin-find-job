import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './menu.module.scss';
import Button from '@/app/@func/Button/Button';

const cx = classNames.bind(styles);

MenuItem.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object,
};

function MenuItem({ data, onClick = () => {} }) {
    return (
        <Button onClick={onClick} to={data.to} className={cx('jax-chuk')}>
            <span className={cx('menu-span')}>{data.icon}</span>
            <span>{data.title}</span>
        </Button>
    );
}

export default MenuItem;
