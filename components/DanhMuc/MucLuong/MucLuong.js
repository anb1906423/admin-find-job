import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import {
    createNewMucLuong,
    deleteMucLuong,
    getAllMucLuong,
    updateMucLuong,
} from '@/services';
import { swalert, swtoast } from '@/mixin/swal.mixin';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import _ from 'lodash';
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả mức lương', 'Tạo mới mức lương'];
function MucLuongComponent(props) {
    const [indexClick, setIndexClick] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const [idAction, setIdAction] = useState(null);
    const [typeAction, setTypeAction] = useState('');

    const [ten, setTen] = useState('');
    const [err, setErr] = useState('');

    const tenRef = useRef()

    const fetch = async () => {
        setIsLoading(true);

        try {
            const Res = await getAllMucLuong();

            const { data } = Res;

            if (data) {
                setData(data);
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
        setIdAction(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ten) {
            tenRef.current.focus()
            setErr("Vui lòng nhập mức lương!")
            return;
        }

        const dataBuild = {
            ten,
        };

        setIsLoading(true);

        try {
            typeAction === 'EDIT'
                ? await updateMucLuong(idAction, dataBuild)
                : await createNewMucLuong(dataBuild);
            fetch();
            setTen('');

            swtoast.success({
                text: 'Thông tin mới đã được cập nhật!',
            })
            setIndexClick(1);
            setErr('')
        } catch (error) {
            setErr(error.response.data.message)
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
            setIndexClick(2);
        } else {
            swalert
                .fire({
                    title: 'Xóa mức lương?',
                    icon: 'warning',
                    text: 'Bạn chắc chắn xóa mức lương!',
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteMucLuong(item.id);
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
                titleAll="Tất cả mức lương"
                titleAdd="Thêm mới mức lương"
                data={data}
                isAdd={indexClick === 1 ? false : true}
                cx={cx}
                isBangCap={true}
                handleSubmit={handleSubmit}
                handlePerformAction={handlePerformAction}
                RenderNode={() => (
                    <SupperRenderNode
                        handlePerformActions={handlePerformAction}
                        data={data}
                        RenderChildren={handleRenderNode}
                    >
                        <thead className="table-dark">
                            <tr className='text-center'>
                                <th scope="col">#</th>
                                <th scope="col" className="col-9">
                                    Tên
                                </th>
                                <th scope="col" className="col-2 text-center">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                    </SupperRenderNode>
                )}
            >
                <div className={cx('item')}>
                    <label htmlFor="hoten">Mức lương</label>
                    <input
                        onChange={(e) => setTen(e.target.value)}
                        value={ten}
                        className="form-control"
                        id="hoten"
                        placeholder="eg: 5 - 10 triệu ..."
                        ref={tenRef}
                    />
                    <p style={{ margin: "0", paddingTop: '4px' }} className="text-danger">
                        {err}
                    </p>
                </div>
                <div className='text-center'>
                    <button className="btn btn-dark">
                        Enter
                    </button>
                </div>
            </SupperComponents>
        </div>
    );
}

MucLuongComponent.propTypes = {};

export default MucLuongComponent;
