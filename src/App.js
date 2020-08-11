import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import styles from "./App.module.scss";

const Recharts = React.lazy(() => import("./views/Recharts/Recharts"));
const Nivo = React.lazy(() => import("./views/Nivo/Nivo"));
const D3 = React.lazy(() => import("./views/D3/D3"));

function App() {
    return (
        <React.Suspense fallback="Loading...">
            <div className={styles.App}>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        Home
                    </Route>
                    <Route path="/recharts">
                        <Recharts />
                    </Route>
                    <Route path="/nivo">
                        <Nivo />
                    </Route>
                    <Route path="/d3">
                        <D3 />
                    </Route>
                </Switch>
            </div>
        </React.Suspense>
    );
}

export default App;
