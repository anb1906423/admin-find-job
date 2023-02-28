import axios from 'axios';
import { swtoast, swalert } from '@/mixin/swal.mixin';
import { backendAPI } from '../../config'

const DeleteAccountItem = async (productId) => {
    swalert
        .fire({
            title: "Xóa biến thể sản phẩm",
            icon: "warning",
            text: "Bạn muốn xóa biến thể sản phẩm này?",
            showCloseButton: true,
            showCancelButton: true,
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(backendAPI + `${productId}`);
                    console.log(`Đã xóa sản phẩm có ID ${productId}`);
                } catch (error) {
                    console.error(error);
                }
            }
        })
};

export default DeleteAccountItem;