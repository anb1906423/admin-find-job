import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import { createNewBangCap, deleteBangCap, getAllBangCap, updateBangCap } from '@/services';
import { swalert, swtoast } from '@/mixin/swal.mixin';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả bằng cấp', 'Tạo mới bằng cấp'];
function BangCapComponent(props) {
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

            swtoast.success({
                text: 'Thông tin mới đã được cập nhật!',
            })
            setIndexClick(1);
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
                    title: 'Xóa bằng cấp?',
                    icon: 'warning',
                    text: 'Bạn chắc chắn xóa bằng cấp!',
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

    const handleRenderNode = ({ item, handlePerformActions = () => { }, index }) => {
        return (
            <tbody>
                {!_.isEmpty(item) && (
                    <tr>
                        <th className='align-middle text-center' scope="row">{index + 1}</th>
                        <td className='align-middle text-center'>{item.ten}</td>
                        <td className='align-middle text-center'>{item.donViDaoTao}</td>
                        <td className='align-middle text-center'>{item.xepLoai}</td>
                        <td className='align-middle text-center'>
                            <button
                                onClick={() =>
                                    handlePerformActions({
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
                                    handlePerformActions({
                                        item,
                                        type: 'EDIT',
                                    })
                                }
                                className="btn mx-1"
                            >
                                <EditOutlined />
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        );
    };

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
                RenderNode={() => (
                    <SupperRenderNode
                        handlePerformActions={handlePerformAction}
                        data={dataBangCap}
                        RenderChildren={handleRenderNode}
                    >
                        <thead className="table-dark">
                            <tr className='text-center'>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">{'Đơn vị đào tạo'}</th>
                                <th scope="col">{'Xếp loại'}</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                    </SupperRenderNode>
                )
                }
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
                        placeholder="eg: Đại học Cần Thơ"
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
                        placeholder="eg: Giỏi, Khá, Trung bình, Xuất sắc"
                        required
                    />
                </div>
                <div className='text-center'>
                    <button className="btn btn-dark">
                    Enter
                    </button>
                </div>
            </SupperComponents >
        </div >
    );
}

BangCapComponent.propTypes = {};

export default BangCapComponent;
