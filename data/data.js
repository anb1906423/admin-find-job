import { UserOutlined, PieChartOutlined, FileDoneOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export const menu = [
    {
        title: 'Dashboard',
        href: '/',
        list: [],
        icon: <PieChartOutlined />,
    },
    {
        title: 'Tất cả công việc',
        href: '/tat-ca-cong-viec',
        list: [],
        icon: <FileDoneOutlined />,
    },
    {
        title: 'Quản lý tài khoản',
        href: '#',
        icon: <UserOutlined />,
        list: [
            {
                title: 'Nhà tuyển dụng',
                href: '/quan-ly-tai-khoan/nha-tuyen-dung',
            },
            {
                title: 'Ứng viên',
                href: '/quan-ly-tai-khoan/ung-vien',
            },
        ],
    },
    {
        title: 'Quản lý danh mục',
        href: '#',
        icon: <MenuUnfoldOutlined />,
        list: [
            {
                title: 'Bằng cấp',
                href: '/quan-ly-danh-muc/bang-cap',
            },
            {
                title: 'Cấp bậc',
                href: '/quan-ly-danh-muc/cap-bac',
            },
            {
                title: 'Địa điểm làm việc',
                href: '/quan-ly-danh-muc/dia-diem-lam-viec',
            },
            {
                title: 'Kinh nghiệm',
                href: '/quan-ly-danh-muc/kinh-nghiem',
            },
            {
                title: 'Lĩnh vực kinh doanh',
                href: '/quan-ly-danh-muc/linh-vuc-kinh-doanh',
            },
            {
                title: 'Loại hình doanh nghiệp',
                href: '/quan-ly-danh-muc/loai-hinh-doanh-nghiep',
            },
            {
                title: 'Loại hợp đồng',
                href: '/quan-ly-danh-muc/loai-hop-dong',
            },
            {
                title: 'Mức lương',
                href: '/quan-ly-danh-muc/muc-luong',
            },
            {
                title: 'Ngành nghề',
                href: '/quan-ly-danh-muc/nganh-nghe',
            },
            {
                title: 'Quy mô doanh nghiệp',
                href: '/quan-ly-danh-muc/quy-mo',
            },
        ],
    },
];
