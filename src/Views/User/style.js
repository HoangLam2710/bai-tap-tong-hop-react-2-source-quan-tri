import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        container: {
            margin: "40px auto",
        },
        table: {
            minWidth: 650,
        },
        pagination: {
            "& > *": {
                marginTop: theme.spacing(3),
                justifyContent: "center",
            },
        },
        button: {
            width: "100%",
            textAlign: "right",
            marginBottom: theme.spacing(1),
        },
        buttonAdd: {
            backgroundColor: theme.palette.success.main,
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.success.dark,
            },
        },
        buttonEdit: {
            backgroundColor: theme.palette.info.main,
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.info.dark,
            },
        },
        buttonDelete: {
            backgroundColor: theme.palette.error.main,
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
            marginLeft: theme.spacing(1),
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    };
});

export default useStyles;
