import { createAction } from "./index";
import { actionTypes } from "./types";
import { request } from "../../API/request";

export const signIn = (user) => (dispatch) => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
    })
        .then((res) => {
            if (res.data.maLoaiNguoiDung === "QuanTri") {
                dispatch(createAction(actionTypes.SET_USER, res.data));
                localStorage.setItem("t", res.data.accessToken);
                localStorage.setItem("taiKhoan", res.data.taiKhoan);
            } else {
                alert("Tài khoản không được quyền truy cập!!!");
            }
        })
        .catch((err) => {
            alert("Tài khoản hoặc mật khẩu nhập sai!!!");
            console.log(err);
        });
};

export const getUser = (user) => (dispatch) => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        data: {
            taiKhoan: user,
        },
    })
        .then((res) => {
            dispatch(createAction(actionTypes.SET_USER, res.data));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const fetchUserList = (currentPage) => (dispatch) => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01",
        method: "GET",
        params: {
            soTrang: currentPage,
            soPhanTuTrenTrang: 20,
        },
    })
        .then((res) =>
            dispatch(createAction(actionTypes.SET_USERLIST, res.data))
        )
        .catch((err) => console.log(err));
};

export const addUser = (user, callback) => () => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("t"),
        },
    })
        .then((res) => {
            console.log(res.data);
            callback();
        })
        .catch((err) => console.log(err));
};

export const editUser = (user, callback) => () => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: user,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("t"),
        },
    })
        .then((res) => {
            console.log(res.data);
            callback();
        })
        .catch((err) => console.log(err));
};

export const deleteUserApi = (user, callback) => () => {
    request({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
            TaiKhoan: user.taiKhoan,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem("t"),
        },
    })
        .then((res) => {
            console.log(res.data);
            callback();
        })
        .catch((err) => console.log(err));
};
