<<<<<<< HEAD
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
=======
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { DashOutlined, DeleteOutlined } from '@ant-design/icons';
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85

function SupperComponents({
    titleAll,
    titleAdd = '',
    isAdd = false,
    data,
    cx = () => {},
    children,
    handleSubmit = () => {},
<<<<<<< HEAD
    handlePerformAction = () => {},
    RenderNode = () => {},
=======
    isBangCap = false,
    handlePerformAction = () => {},
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
}) {
    return (
        <div className={cx('content')}>
            {isAdd ? (
<<<<<<< HEAD
                <div className={cx('content-item pt-4')}>
=======
                <div className={cx('content-item')}>
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
                    <h3 className="text-center pb-3">{titleAdd}</h3>
                    <div className={cx('content-body-render')}>
                        <div className={cx('wp-form')}>
                            <form onSubmit={handleSubmit}>{children}</form>
                        </div>
                    </div>
                </div>
            ) : (
<<<<<<< HEAD
                <div className={cx('content-item pt-4')}>
                    <h3 className="text-center pb-3">{titleAll}</h3>
                    <div className={cx('content-body-render')}>
                        <RenderNode handlePerformAction={handlePerformAction} data={data} />
=======
                <div className={cx('content-item')}>
                    <h3 className="text-center pb-3">{titleAll}</h3>
                    <div className={cx('content-body-render')}>
                        <table className="table table-hover align-middle table-primary">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">{isBangCap && 'Đơn vị đào tạo'}</th>
                                    <th scope="col">{isBangCap && 'Xếp loại'}</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((item, index) => {
                                        const id = uuidv4();

                                        return (
                                            <tr key={id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.ten}</td>
                                                <td>{isBangCap && item.donViDaoTao}</td>
                                                <td>{isBangCap && item.xepLoai}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handlePerformAction({
                                                                item,
                                                                type: 'DELETE',
                                                            })
                                                        }
                                                        className="btn mx-1"
                                                    >
                                                        <DeleteOutlined />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handlePerformAction({
                                                                item,
                                                                type: 'EDIT',
                                                            })
                                                        }
                                                        className="btn mx-1"
                                                    >
                                                        <DashOutlined />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
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
<<<<<<< HEAD
    titleAll: PropTypes.string,
    titleAdd: PropTypes.string,
    isAdd: PropTypes.bool,
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
    handlePerformAction: PropTypes.func,
    RenderNode: PropTypes.func,
};

export default memo(SupperComponents);
=======
};

export default SupperComponents;
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
