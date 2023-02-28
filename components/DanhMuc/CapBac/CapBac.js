import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import styles from '../danhmuc.module.scss';
import Loading from '@/app/@func/Loading/Loading';
import SupperComponents from '@/app/components/SupperComponents/SupperComponents';
import SupperSwitchButton from '@/app/components/SupperSwitchButton/SupperSwitchButton';
import { createNewCapBac, deleteCapBac, getAllCapBac, updateCapBac } from '@/services';
import { swalert } from '@/mixin/swal.mixin';
import _ from 'lodash';
import SupperRenderNode from '@/app/components/SupperRenderNode/SupperRenderNode';

const cx = classNames.bind(styles);

const buttonArray = ['Tất cả cấp bậc', 'Tạo mới cấp bậc'];
function CapBacComponent(props) {
    const [indexClick, setIndexClick] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const [idAction, setIdAction] = useState(null);
    const [typeAction, setTypeAction] = useState('');

    const [ten, setTen] = useState('');

    const fetch = async () => {
        setIsLoading(true);

        try {
            const Res = await getAllCapBac();

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
            typeAction === 'EDIT' ? await updateCapBac(idAction, dataBuild) : await createNewCapBac(dataBuild);
            fetch();
            setTen('');

            swalert
                .fire({
                    title: 'Đã thực hiện thành công hành động!',
                    icon: 'warning',
                    text: 'Bạn đã tạo thành công cấp bậc',
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
            setIndexClick(2);
        } else {
            swalert
                .fire({
                    title: 'Bạn chắc chắn với hành động của mình?',
                    icon: 'warning',
                    text: 'hành động xóa sẽ không thể khôi phục lại được !',
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteCapBac(item.id);
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
                        <th scope="row">{index + 1}</th>
                        <td>{item.ten}</td>
                        <td className="text-center">
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

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading />}
            <SupperSwitchButton onButtonClick={handleButtonClick} buttonArray={buttonArray} />
            <SupperComponents
                titleAll="Tất cả cấp bậc của bạn"
                titleAdd="Thêm mới cấp bậc"
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
                            <tr>
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
                    <label htmlFor="hoten">Tên cấp bậc của bạn</label>
                    <input
                        onChange={(e) => setTen(e.target.value)}
                        value={ten}
                        className="form-control"
                        id="hoten"
                        placeholder="eg: Thạc sĩ, giáo sư, giáo sư phó tiến sĩ"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-success">
                        {typeAction === 'EDIT' ? 'Thực hiện chỉnh sửa' : 'Thêm mới cấp bậc'}
                    </button>
                </div>
            </SupperComponents>
        </div>
    );
}

CapBacComponent.propTypes = {};

export default CapBacComponent;
