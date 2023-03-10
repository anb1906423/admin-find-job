import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Switch } from 'antd';
import { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';

import styles from './taikhoannhatuyendung.module.scss';
import Heading from '@/components/Heading';
import { getAllAccountNhaTuyenDung } from '@/services';
import Loading from '@/app/@func/Loading';
import PreViewAccount from '@/app/components/PreViewAccount/PreViewAccount';
import Wrapper from '@/app/components/Popper/Wrapper';
import axios from 'axios';
import { backendAPI } from '../../../config';
import { swalert, swtoast } from '@/mixin/swal.mixin';

const cx = classNames.bind(styles);

function TaiKhoanNhaTuyenDung() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountNhaTuyenDung();

                if (Res && Res.data.length > 0) {
                    setData(Res.data);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();
    }, []);

    const refreshData = async () => {
        const result = await axios.get(backendAPI + '/nha-tuyen-dung');
        setData(result.data);
    };

    const handleUpdateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/nha-tuyen-dung/off', { nha_tuyen_dung_id: id })
                : await axios.put(backendAPI + '/nha-tuyen-dung/on', { nha_tuyen_dung_id: id });

            // Update the item state with the new value returned from the API
            console.log(updatedItem);
            refreshData();
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'X???y ra l???i khi thay ?????i tr???ng th??i nh?? tuy???n d???ng!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    const PreviewAccount = (item) => {
        return (
            <Wrapper>
                <PreViewAccount isNhaTuyenDung={true} data={item} />
            </Wrapper>
        );
    };

    return (
        <div className={cx('tai-khoan-ung-vien-wp')}>
            {isLoading && <Loading />}
            <Heading title="Danh S??ch T??i Kho???n Nh?? Tuy???n D???ng" />
            <table className="table table-hover align-middle table-primary">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">T??n nh?? tuy???n d???ng</th>
                        <th scope="col">Email</th>
                        <th scope="col">SDT</th>
                        <th scope="col">?????a ch???</th>
                        <th scope="col">M?? s??? thu???</th>
                        <th scope="col" className="text-center">
                            Tr???ng th??i
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!_.isEmpty(data) &&
                        data.map((item, index) => {
                            const id = uuidv4();

                            return (
                                // <Tippy
                                //     key={id}
                                //     delay={[50, 100]}
                                //     placement="bottom-start"
                                //     render={() => PreviewAccount(item)}
                                // >
                                // </Tippy>
                                <tr key={id} className={cx('item-account')}>
                                    <td>{index + 1}</td>
                                    <td>{item.tenCty ? item.tenCty : 'None'}</td>
                                    <td>{item.email ? item.email : 'None'}</td>
                                    <td>{item.soDienThoai ? item.soDienThoai : 'None'}</td>
                                    <td>{item.diaChi ? item.diaChi : 'None'}</td>
                                    <td>{item.maSoThue ? item.maSoThue : 'None'}</td>
                                    <td className="text-center">
                                        <Switch
                                            size="small"
                                            checked={item.state}
                                            onChange={() => handleUpdateState(item, item.id)}
                                            disabled={disabledInputState}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className={cx('btn-next', 'd-flex', 'justify-content-center', 'py-4')}>
                <button className="btn btn-primary">Xem Th??m T??i Kho???n</button>
            </div>
        </div>
    );
}

TaiKhoanNhaTuyenDung.propTypes = {};

export default TaiKhoanNhaTuyenDung;
