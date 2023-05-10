import axios from "axios"
import { backendAPI } from "@/config"

const fetchDashboard = async () => {
    try {
        const result = await axios.get(backendAPI + "/dashboard/api/total");
        const { totalUngVien, totalNhaTuyenDung, totalCongViec, totalLuotUngTuyen } = result.data;

        const months = 3;

        DashboardData[0].average = (totalUngVien / months).toFixed(1);
        DashboardData[1].average = (totalNhaTuyenDung / months).toFixed(1);
        DashboardData[2].average = (totalCongViec / months).toFixed(1);
        DashboardData[3].average = (totalLuotUngTuyen / months).toFixed(1);        

        // Cập nhật giá trị total trong mảng DashboardData
        DashboardData[0].total = totalUngVien.toString();
        DashboardData[1].total = totalNhaTuyenDung.toString();
        DashboardData[2].total = totalCongViec.toString();
        DashboardData[3].total = totalLuotUngTuyen.toString();
    } catch (error) {
        console.error("Lỗi:", error);
        // Xử lý lỗi nếu có
    }
}

fetchDashboard()

export const DashboardData = [
    {
        title: "Tổng ứng viên",
        total: "",
        path: "quan-ly-tai-khoan/ung-vien",
        average: "",
    },
    {
        title: "Tổng nhà tuyển dụng",
        total: "",
        path: "quan-ly-tai-khoan/nha-tuyen-dung",
        average: "",
    },
    {
        title: "Công việc đã đăng",
        total: "",
        path: "quan-ly-bai-dang",
        average: "",
    },
    {
        title: "Lượt ứng tuyển",
        total: "",
        path: "thong-tin",
        average: "",
    },
]