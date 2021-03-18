import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";


import Search from "../pages/search"
import Product from "../pages/product"
import Stats from "../pages/stats"
import NavSearch from "../components/nav-search"


export default function App() {
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">VapeScrape</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="/stats">Dashboard</Nav.Link>
                    </Nav>
                    <NavSearch />
                </Navbar>

                <Switch>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/stats">
                        <Stats />
                    </Route>
                    <Route path="/product">
                        <Product />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <h2>Home, sweet home...</h2>
    )
}