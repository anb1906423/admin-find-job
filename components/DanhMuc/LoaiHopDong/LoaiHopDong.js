import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import { createNewLoaiHopDong, deleteLoaiHopDong, getAllLoaiHopDong, updateLoaiHopDong } from '@/services';
import { swalert, swtoast } from '@/mixin/swal.mixin';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả loại hợp đồng', 'Tạo mới loại hợp đồng'];
function LoaiHopDongComponent(props) {
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
            const Res = await getAllLoaiHopDong();

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
            setErr("Vui lòng nhập loại hợp đồng!")
            return;
        }

        const dataBuild = {
            ten,
        };

        setIsLoading(true);

        try {
            typeAction === 'EDIT'
                ? await updateLoaiHopDong(idAction, dataBuild)
                : await createNewLoaiHopDong(dataBuild);
            fetch();
            setTen('');

            swtoast.success({
                text: 'Thông tin mới đã được cập nhật!',
            })
            setIndexClick(1);
            setErr('')
        } catch (error) {
            // setErr("Loại hợp đồng đã tồn tại!")
            console.log(error);
            setErr(error.response.data.message)
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
                    title: 'Xóa loại hợp đồng?',
                    icon: 'warning',
                    text: 'Bạn chắc chắn xóa loại hợp đồng!',
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteLoaiHopDong(item.id);
                        fetch();
                    }

                    if (result.dismiss) {
                        setIndexClick(1);
                    }
                });
        }
    };

    const handleRenderNode = ({ item, handlePerformActions = () => {}, index }) => {
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
                titleAll="Tất cả loại hợp đồng"
                titleAdd="Thêm mới loại hợp đồng"
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
                            <tr className="text-center">
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
                    <label htmlFor="hoten">Loại hợp đồng</label>
                    <input
                        onChange={(e) => setTen(e.target.value)}
                        value={ten}
                        className="form-control"
                        id="hoten"
                        placeholder="eg: Hợp đồng lao động, ..."
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

LoaiHopDongComponent.propTypes = {};

export default LoaiHopDongComponent;
