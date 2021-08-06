import React from "react";
import {
    Typography,
    TextField,
    InputAdornment,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import useStyle from "./style";
import {
    AccountCircle,
    Lock,
    Email,
    PhoneIphone,
    Person,
} from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { editUser, fetchUserList } from "../../Store/actions/user";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";

const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required!"),
    matKhau: yup.string().required("This field is required!"),
    hoTen: yup.string().required("This field is required!"),
    email: yup
        .string()
        .email("Invalid Email")
        .required("This field is required!"),
    soDt: yup
        .string()
        .required("This field is required!")
        .matches(/^[0-9]{10}$/g, "Invalid Phone number"),
});

const EditUser = () => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const userEdit = useSelector((state) => {
        return state.user.userEdit;
    });

    const page = useSelector((state) => {
        return state.user.page;
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDt,
            maNhom: "GP01",
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            hoTen: userEdit.hoTen,
        },
        validationSchema,
        validateOnMount: true,
    });

    const setAllTouched = useCallback(() => {
        Object.keys(formik.values).forEach((key) =>
            formik.setFieldTouched(key)
        );
    }, [formik]);

    const goToHome = useCallback(() => {
        alert("Cập nhật thành công!!!");
        // thêm thành công thì tắt popup
        dispatch(createAction(actionTypes.SET_OPEN, false));
        dispatch(fetchUserList(page));
    }, [dispatch, page]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setAllTouched();
            if (!formik.isValid) return;
            dispatch(editUser(formik.values, goToHome));
        },
        [dispatch, formik.isValid, formik.values, setAllTouched, goToHome]
    );

    return (
        <>
            <Typography component="h2" variant="h6">
                Cập nhật thông tin
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="username"
                        label="Tài khoản"
                        name="taiKhoan"
                        value={formik.values.taiKhoan}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        disabled
                    />
                    {formik.touched.taiKhoan && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.taiKhoan}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="password"
                        type="password"
                        label="Mật khẩu"
                        name="matKhau"
                        value={formik.values.matKhau}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.matKhau && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.matKhau}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="fullname"
                        label="Họ tên"
                        name="hoTen"
                        value={formik.values.hoTen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.hoTen && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.hoTen}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="email"
                        type="email"
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.email && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.email}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <TextField
                        className={classes.textField}
                        id="phone"
                        label="Số điện thoại"
                        name="soDt"
                        value={formik.values.soDt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIphone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formik.touched.soDt && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.soDt}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="select-loaikhachhang-label">
                            Loại khách hàng
                        </InputLabel>
                        <Select
                            labelId="select-loaikhachhang-label"
                            id="select-loaikhachhang"
                            displayEmpty
                            name="maLoaiNguoiDung"
                            value={formik.values.maLoaiNguoiDung}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="KhachHang">Khách Hàng</MenuItem>
                            <MenuItem value="QuanTri">Quản Trị</MenuItem>
                        </Select>
                    </FormControl>
                    {formik.touched.maLoaiNguoiDung && (
                        <Typography color="error" variant={"subtitle2"}>
                            {formik.errors.maLoaiNguoiDung}
                        </Typography>
                    )}
                </div>
                <div className={classes.margin}>
                    <Button type="submit" variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </>
    );
};

export default EditUser;
