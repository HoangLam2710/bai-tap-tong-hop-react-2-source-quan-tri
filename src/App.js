import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import PageNotFound from "./Views/PageNotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
