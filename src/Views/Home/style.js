import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        container: {
            margin: "20px auto",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        textField: {
            width: "100%",
        },
        margin: {
            margin: "20px 0",
        },
    };
});

export default useStyles;
