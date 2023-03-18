import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import { createNewNghanhNghe, deleteNghanhNghe, getAllNghanhNghe, updateNghanhNghe } from '@/services';
import { swalert, swtoast } from '@/mixin/swal.mixin';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import _ from 'lodash';
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả nghành nghề', 'Tạo mới nghành nghề'];
function NghanhNgheComponent(props) {
    const [indexClick, setIndexClick] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const [idAction, setIdAction] = useState(null);
    const [typeAction, setTypeAction] = useState('');

    const [ten, setTen] = useState('');

    const fetch = async () => {
        setIsLoading(true);

        try {
            const Res = await getAllNghanhNghe();

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

        if (!ten) return;

        const dataBuild = {
            ten,
        };

        setIsLoading(true);

        try {
            typeAction === 'EDIT' ? await updateNghanhNghe(idAction, dataBuild) : await createNewNghanhNghe(dataBuild);
            fetch();
            setTen('');

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
            setIndexClick(2);
        } else {
            swalert
                .fire({
                    title: 'Xóa ngành nghè?',
                    icon: 'warning',
                    text: 'Bạn chắc chắn xóa ngành nghề!',
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteNghanhNghe(item.id);
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
                titleAll="Tất cả nghành nghề"
                titleAdd="Thêm mới nghành nghề"
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
                                <th scope="col" class="col-9">
                                    Tên
                                </th>
                                <th scope="col" class="col-2 text-center">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                    </SupperRenderNode>
                )}
            >
                <div className={cx('item')}>
                    <label htmlFor="hoten">Tên nghành nghề</label>
                    <input
                        onChange={(e) => setTen(e.target.value)}
                        value={ten}
                        className="form-control"
                        id="hoten"
                        placeholder="eg: Lao động tự do..."
                        required
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-dark">
                        Enter
                    </button>
                </div>
            </SupperComponents>
        </div>
    );
}

NghanhNgheComponent.propTypes = {};

export default NghanhNgheComponent;
