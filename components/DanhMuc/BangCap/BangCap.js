<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import { createNewBangCap, deleteBangCap, getAllBangCap, updateBangCap } from '@/services';
import { swalert } from '@/mixin/swal.mixin';
import _ from 'lodash';
<<<<<<< HEAD
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';
=======
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả bằng cấp', 'Tạo mới bằng cấp'];
function BangCapComponent(props) {
    const buttonArray = ['Tất cả bằng cấp', 'Tạo mới bằng cấp'];

    // nếu isAddBangCap = true thì sẽ cho add không thì ta sẽ show ra tất cả bằng cấp hiện có
    const [indexClick, setIndexClick] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataBangCap, setDataBangCap] = useState([]);

    const [idAction, setIdAction] = useState(null);
    const [typeAction, setTypeAction] = useState('');

    const [ten, setTen] = useState('');
    const [donViDaoTao, setDonViDaoTao] = useState('');
    const [xepLoai, setXepLoai] = useState('');

    const fetch = async () => {
        setIsLoading(true);

        try {
            const Res = await getAllBangCap();

            const { data } = Res;

            if (data) {
                setDataBangCap(data);
            }
        } catch (error) {
            //handle xử lí khi gặp lỗi tai đây
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleButtonClick = (index) => {
        setIndexClick(index + 1);
        setTypeAction('');
        setTen('');
        setDonViDaoTao('');
        setXepLoai('');
        setIdAction(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ten || !donViDaoTao || !xepLoai) return;

        const dataBuild = {
            ten,
            donViDaoTao,
            xepLoai,
        };

        setIsLoading(true);

        try {
            typeAction === 'EDIT' ? await updateBangCap(idAction, dataBuild) : await createNewBangCap(dataBuild);
            fetch();
            setTen('');
            setDonViDaoTao('');
            setXepLoai('');

            swalert
                .fire({
                    title: 'Đã thực hiện thành công hành động!',
                    icon: 'warning',
                    text: 'Bạn đã tạo thành công bằng cấp',
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        setIndexClick(1);
                    }

                    if (result.dismiss) {
                        setIndexClick(1);
                    }
                });
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    const handlePerformAction = ({ item, type }) => {
        if (_.isEmpty(item) || !type) {
            alert('Hàm thực hiện hành động thiếu tham số!');
            return;
        }

        if (type === 'EDIT') {
            setIdAction(item.id);
            setTypeAction(type);
            setTen(item.ten);
            setDonViDaoTao(item.donViDaoTao);
            setXepLoai(item.xepLoai);
            setIndexClick(2);
        } else {
            swalert
                .fire({
                    title: 'Bạn chắc chắn với hành động của mình?',
                    icon: 'warning',
<<<<<<< HEAD
                    text: 'hành động xóa sẽ không thể khôi phục lại được !',
=======
                    text: 'Hành động xóa sẽ không thể khôi phục lại được!',
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteBangCap(item.id);
                        fetch();
                    }

                    if (result.dismiss) {
                        setIndexClick(1);
                    }
                });
        }
    };
<<<<<<< HEAD

    const handleRenderNode = ({ item, handlePerformActions = () => {}, index }) => {
        return (
            <tbody>
                {!_.isEmpty(item) && (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.ten}</td>
                        <td>{item.donViDaoTao}</td>
                        <td>{item.xepLoai}</td>
                        <td>
                            <button
                                onClick={() =>
                                    handlePerformActions({
                                        item,
                                        type: 'DELETE',
                                    })
                                }
                                className="btn mx-1"
                            >
                                <i className="bi bi-trash2"></i>
                            </button>
                            <button
                                onClick={() =>
                                    handlePerformActions({
                                        item,
                                        type: 'EDIT',
                                    })
                                }
                                className="btn mx-1"
                            >
                                <i className="bi bi-menu-up"></i>
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        );
    };
=======
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading />}
            <SupperSwitchButton onButtonClick={handleButtonClick} buttonArray={buttonArray} />
            <SupperComponents
                titleAll="Tất cả bằng cấp của bạn"
                titleAdd="Thêm mới bằng cấp"
                data={dataBangCap}
                isAdd={indexClick === 1 ? false : true}
                cx={cx}
                isBangCap={true}
                handleSubmit={handleSubmit}
                handlePerformAction={handlePerformAction}
<<<<<<< HEAD
                RenderNode={() => (
                    <SupperRenderNode
                        handlePerformActions={handlePerformAction}
                        data={dataBangCap}
                        RenderChildren={handleRenderNode}
                    >
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">{'Đơn vị đào tạo'}</th>
                                <th scope="col">{'Xếp loại'}</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                    </SupperRenderNode>
                )}
=======
>>>>>>> 8045ba76a529eb3aacd44a28351e275959c08f85
            >
                <div className={cx('item')}>
                    <label htmlFor="hoten">Tên bằng cấp của bạn</label>
                    <input
                        onChange={(e) => setTen(e.target.value)}
                        value={ten}
                        className="form-control"
                        id="hoten"
                        placeholder="eg: Bằng đại học cử nhân"
                        required
                    />
                </div>
                <div className={cx('item')}>
                    <label htmlFor="don-vi-dao-tao">Đơn vị đào tạo</label>
                    <input
                        onChange={(e) => setDonViDaoTao(e.target.value)}
                        value={donViDaoTao}
                        className="form-control"
                        id="don-vi-dao-tao"
                        placeholder="eg: Đại Học Cần Thơ"
                        required
                    />
                </div>
                <div className={cx('item')}>
                    <label htmlFor="xep-loai">Xếp loại</label>
                    <input
                        onChange={(e) => setXepLoai(e.target.value)}
                        value={xepLoai}
                        className="form-control"
                        id="xep-loai"
                        placeholder="eg: Giỏi, khá, trung bình, xuất sắc"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-success">
                        {typeAction === 'EDIT' ? 'Thực hiện chỉnh sửa' : 'Thêm mới bằng cấp'}
                    </button>
                </div>
            </SupperComponents>
        </div>
    );
}

BangCapComponent.propTypes = {};

export default BangCapComponent;