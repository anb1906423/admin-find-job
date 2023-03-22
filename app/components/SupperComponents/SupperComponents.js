import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function SupperComponents({
    titleAll,
    titleAdd = '',
    isAdd = false,
    data,
    cx = () => { },
    children,
    handleSubmit = () => { },
    handlePerformAction = () => { },
    RenderNode = () => { },
}) {
    return (
        <div className={cx('content')}>
            {isAdd ? (
                <div className={cx('content-item pt-2')}>
                    <h3
                        className="text-center pb-2 text-uppercase fs-5">{titleAdd}</h3>
                    <div className={cx('content-body-render')}>
                        <div className={cx('wp-form')}>
                            <form onSubmit={handleSubmit}>{children}</form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('content-item pt-2')}>
                    <h3 className="text-center pb-2 text-uppercase fs-5">{titleAll}</h3>
                    <div className={cx('content-body-render')}>
                        <RenderNode handlePerformAction={handlePerformAction} data={data} />
                    </div>
                </div>
            )}
        </div>
    );
}

// Khi người dùng sử dụng components này thì bắt buộc người dùng phải truyền vào đây một array
// mục đích để render ra dữ liệu (required)

// cx là một cái hàm truyền từ cha xuống nó dùng để combailer scss, css module cx cũng không cần phải truyền bởi vì đã khai báo mặc định là một hàm nếu ta không truyền
SupperComponents.propTypes = {
    isBangCap: PropTypes.bool,
    data: PropTypes.array.isRequired,
    cx: PropTypes.func,
    titleAll: PropTypes.string,
    titleAdd: PropTypes.string,
    isAdd: PropTypes.bool,
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
    handlePerformAction: PropTypes.func,
    RenderNode: PropTypes.func,
};

export default memo(SupperComponents);
