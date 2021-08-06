import React, { memo } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Modal,
    Fade,
    Backdrop,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./style";
import { Delete, Add, Edit } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, deleteUserApi } from "../../Store/actions/user";
import { useCallback } from "react";
import AddUser from "../../Components/AddUser";
import EditUser from "../../Components/EditUser";
import { actionTypes } from "../../Store/actions/types";
import { createAction } from "../../Store/actions";

const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector((state) => {
        return state.user.open;
    });

    const isEdit = useSelector((state) => {
        return state.user.isEdit;
    });

    const page = useSelector((state) => {
        return state.user.page;
    });

    const handleOpen = useCallback(
        (edit, item = {}) => {
            // thực hiển việc mở popup
            dispatch(createAction(actionTypes.SET_OPEN, true));
            // thực hiện việc mở edit hay mở add
            dispatch(createAction(actionTypes.SET_EDIT, edit));
            // thực viện set thông tin user cần edit
            dispatch(createAction(actionTypes.SET_USER_EDIT, item));
        },
        [dispatch]
    );

    const handleClose = useCallback(() => {
        // thực hiển việc tắt popup
        dispatch(createAction(actionTypes.SET_OPEN, false));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserList(page));
    }, [dispatch, page]);

    const userList = useSelector((state) => {
        return state.user.userList;
    });

    const hanldChangePage = useCallback(
        (event, value) => {
            dispatch(createAction(actionTypes.SET_PAGE, value));
            dispatch(fetchUserList(value));
            window.scroll({ top: 0, behavior: "smooth" });
        },
        [dispatch]
    );

    const alertDelete = useCallback(() => {
        alert("Xoá thành công!!!");
        dispatch(fetchUserList(page));
    }, [dispatch, page]);

    const deleteUser = useCallback(
        (user) => {
            dispatch(deleteUserApi(user, alertDelete));
        },
        [dispatch, alertDelete]
    );

    return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.button}>
                <Button
                    variant="contained"
                    className={classes.buttonAdd}
                    startIcon={<Add />}
                    onClick={() => handleOpen(false)}
                >
                    Add
                </Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            {isEdit ? <EditUser /> : <AddUser />}
                        </div>
                    </Fade>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Họ tên</TableCell>
                            <TableCell align="right">Tài khoản</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Số điện thoại</TableCell>
                            <TableCell align="right">Loại người dùng</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList &&
                            userList.items.map((item) => {
                                return (
                                    <TableRow key={item.email}>
                                        <TableCell component="th" scope="row">
                                            {item.hoTen}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.taiKhoan}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.email}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.soDt}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.maLoaiNguoiDung}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                className={classes.buttonEdit}
                                                startIcon={<Edit />}
                                                onClick={() =>
                                                    handleOpen(true, item)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className={classes.buttonDelete}
                                                startIcon={<Delete />}
                                                onClick={() => deleteUser(item)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={userList?.totalPages}
                onChange={hanldChangePage}
                className={classes.pagination}
                defaultPage={page}
            />
        </Container>
    );
};

export default memo(User);
