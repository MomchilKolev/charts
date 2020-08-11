import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.scss";

const Navbar = (props) => (
    <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/recharts">Recharts</Link>
        <Link to="/nivo">Nivo</Link>
        <Link to="/d3">D3</Link>
    </nav>
);

export default Navbar;
