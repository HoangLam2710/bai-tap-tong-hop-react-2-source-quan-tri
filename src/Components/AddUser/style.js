import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    return {
        textField: {
            width: 400,
        },
        margin: {
            margin: "20px 0",
        },
        formControl: {
            minWidth: 400,
        },
    };
});

export default useStyle;
