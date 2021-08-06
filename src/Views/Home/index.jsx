import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from "@material-ui/core";
import React from "react";
import useStyles from "./style";
import { AccountCircle, Lock } from "@material-ui/icons";
import User from "../User";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { signIn, getUser } from "../../Store/actions/user";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required!"),
    matKhau: yup.string().required("This field is required!"),
});

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const taiKhoan = localStorage.getItem("taiKhoan");
        if (taiKhoan) {
            dispatch(getUser(taiKhoan));
        }
    }, [dispatch]);

    const user = useSelector((state) => {
        return state.user.user;
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        validateOnMount: true,
        validationSchema,
    });

    const setAllTouched = useCallback(() => {
        Object.keys(formik.values).forEach((key) => {
            formik.setFieldTouched(key);
        });
    }, [formik]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setAllTouched();
            if (!formik.isValid) return;
            dispatch(signIn(formik.values));
        },
        [formik.isValid, formik.values, setAllTouched, dispatch]
    );

    return (
        <>
            {user ? (
                <User />
            ) : (
                <Container maxWidth="lg" className={classes.container}>
                    <Typography variant="h4" component="h1">
                        Welcome to Admin Page
                    </Typography>
                    <form style={{ width: 350 }} onSubmit={handleSubmit}>
                        <div className={classes.margin}>
                            <TextField
                                className={classes.textField}
                                id="username"
                                label="Tài khoản"
                                name="taiKhoan"
                                value={formik.values.taiKhoan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Đăng Nhập
                            </Button>
                        </div>
                    </form>
                </Container>
            )}
        </>
    );
};

export default Home;
