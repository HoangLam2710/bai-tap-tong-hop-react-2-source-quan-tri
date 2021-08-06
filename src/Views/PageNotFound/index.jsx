import React from "react";
import { Container, Typography } from "@material-ui/core";

const PageNotFound = () => {
    return (
        <div>
            <Container maxWidth="lg" style={{ margin: "20px auto" }}>
                <Typography variant="h1" component="h1">
                    Page Not Found!
                </Typography>
            </Container>
        </div>
    );
};

export default PageNotFound;
