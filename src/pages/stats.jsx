import React, { useState, useEffect, useRef } from "react"
import { Container, Jumbotron, Row, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom";

import ModalComponent from "../components/modal-comp"

import { API_BASE_URL } from "../shared/apiConfiguration"

export default function Search() {
    // Initial state for API stats and modal hooks
    const [stats, setStats] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalShowing, setModalShowing] = useState(false);

    // Create reference for Search Input
    const focusSearch = useRef(null);

    
    // helper methods to ease modal handling
    const handleCloseModal = () => setModalShowing(false);
    const handleShowModal = () => setModalShowing(true);
    
    
    // Helper function for retrieving API data
    const getStats = async (query) => {
        const request = await fetch(`${API_BASE_URL}/search?q=${query}`, {
            headers: {
                "accept": "application/json"
            }
        }).catch((e) => {
            setModalData({
                title: "API Error",
                body: "API Response resulted in an error during 'stats' lookup."
            });
            handleShowModal();
            console.log("[VASC] Network error during API 'search' request.")
        });
        if (!request) {
            return null;
        }
        const productData = await request.json();
        return productData;
    }


    // Define the "history" object, so we can update the url 
    const history = useHistory();

    // useEffect - Only renders when "query" is changed
    useEffect(() => {
        const loadStats = async () => {
            const stats = await getStats(query, controller);
        }
        loadStats();
    }, []);

    


    return (
        <>
            <ModalComponent
                show={modalShowing}
                handleClose={handleCloseModal}
                title={modalData.title}
                body={modalData.body}
            />
            <Jumbotron fluid>
                
            </Jumbotron>
        </>
    )
}