import React, { useEffect, useState, } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom';


export default function NavSearch() {
    const [searchTerm, setsearchTerm] = useState('');
    const [hideSearchBar, setHideSearchBar] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if(window.location.pathname.indexOf("search") > 0) {
            setHideSearchBar(true);
        } else {
            setHideSearchBar(false);
        }
    }, [hideSearchBar, location])

    
    useEffect(() => {
        const controller = new AbortController();
        if(searchTerm) {
            history.push({
                pathname: '/search',
                search: '?q='+searchTerm
            })
            setsearchTerm("");
        }
        return () => {
            controller.abort();
        }
    }, [searchTerm, history])

    return (
        <Form inline className={hideSearchBar && "invisible"}>
            <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setsearchTerm(e.target.value)}
                value={searchTerm}
            />
            <Button variant="primary">Search</Button>
        </Form>
    );

}
