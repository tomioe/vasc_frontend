import React, { useState, useEffect } from "react"
import { Modal, Form } from "react-bootstrap"

import Chart from "react-apexcharts";
import { WorldMap } from "react-svg-worldmap"
import {
    Page,
    Grid,
    Card,
    Dropdown,
    Button,
    StatsCard,
    El,
} from "tabler-react";

import { colors } from "tabler-react";

import ModalComponent from "../components/modal-comp"

import { API_BASE_URL } from "../shared/apiConfiguration"



export default function Stats() {
    // Initial state for API stats and modal hooks
    const [stats, setStats] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalShowing, setModalShowing] = useState(true);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [authDate] = useState((localStorage.getItem('authDate') || ''));

    // helper methods to ease modal handling
    const handleCloseModal = () => setModalShowing(false);
    const handleShowModal = () => setModalShowing(true);


    // Helper function for retrieving API data
    const getStats = async () => {
        const request = await fetch(`${API_BASE_URL}/stats/users`, {
            headers: {
                "accept": "application/json"
            }
        }).catch((e) => {
            setModalData({
                title: "API Error",
                body: "API Response resulted in an error during 'stats' lookup."
            });
            handleShowModal();
            console.log("[VASC] Network error during API 'stats' request.")
        });
        if (!request) {
            return null;
        }
        const productData = await request.json();
        return productData;
    }

    // useEffect - Only renders when page is loaded
    useEffect(() => {
        const loadStats = async () => {
            const stats = await getStats();
            //console.log(stats)
            if (stats) {
                setStats(stats);
                setShowStats(true);
            }
        }
        loadStats();
    }, []);

    

    // STATICS
    const TimeframeDropdown = function () {
        return (
            <Dropdown
                triggerAs={El.A}
                triggerContent="24 Hours"
                triggerProps={{ className: "text-muted-light", href: "#" }}
                position="bottom-end"
                arrowPosition="right"
                itemsObject={[
                    { value: "24 Hours" },
                    { value: "7 Days" },
                    { value: "30 Days" },
                ]}
            />
        );
    };

    const chartActiveUsers2Data = {
        series: [
            {
                name: "Unique IP's",
                data: [
                    1,
                    2,
                    3,
                    4,
                ],
            },
        ],
        type: "bar",
        height: "100%",
        options: {
            chart: {
                sparkline: {
                    enabled: true,
                },
            },
            xaxis: {
                type: "datetime",
            },
            labels: Array(30)
                .fill(0)
                .map((_, n) => `2021-03-${n + 1}`),
            colors: [colors.blue],
        },
    };
    const cardChart1Data = {
        series: [
          {
            name: "Clicks",
            data: [
              2,
              8,
              10,
              12,
              14,
            ],
          },
        ],
        height: "100%",
        type: "area",
        options: {
          chart: {
            sparkline: {
              enabled: true,
            },
          },
          xaxis: {
            type: "datetime",
          },
          labels: Array(30)
            .fill(0)
            .map((_, n) => `2021-03-${n + 1}`),
          colors: [colors.blue],
          fill: {
            opacity: 0.16,
          },
          sparkline: {
            enabled: true,
          },
        },
      };
    // STATIC END

    const ipCard = () => {
        return (
            <StatsCard
                layout={4}
                movement={0}
                total={stats.uniqueIPs}
                label="Unique IP's Visited"
                actions={<TimeframeDropdown />}
            >
                <El.Div mt={3} className="chart-sm">
                    {/* TODO: Implement Timeseries */}
                    <Chart {...chartActiveUsers2Data} />
                </El.Div>
            </StatsCard>
        )
    }
    const totalProductsClickedCard = () => {
        return (
            <StatsCard
                label="Total Products Clicked"
                layout={4}
                movement={0}
                total={stats.totalClicks}
                chart={<Chart {...cardChart1Data} />} // TODO: Implement Timeseries
                actions={<TimeframeDropdown />}
            />
                
        )
    }

    const countriesCard = () => {
        if(!stats.countryDistribution)
            return;
        let browserData = {};
        for(let i = 0; i < stats.countryDistribution.length; i++ ) {
            const countryCode = stats.countryDistribution[i]["code"]
            if(!countryCode)
                return;
            if(browserData[countryCode]) {
                browserData[countryCode] += 1;
            } else {
                browserData[countryCode] = 1;
            }
        }
        browserData = Object.entries(browserData).map( browserDataEntry => {
            let entry = {};
            entry["country"] = browserDataEntry[0].toLowerCase();
            entry["value"] = browserDataEntry[1];
            return entry; 
        })
        browserData.push({country: "NaC", value: 0}); // workaround if there's only a single entry...
        return (
            <Card title="Users Map" >
                <WorldMap color="green" title="" size="lg" data={browserData} />
            </Card>
        )
    }

    const browserDistributionCard = () => {
        if(!stats.browserDistribution)
            return;
        const browserNames = Object.keys(stats.browserDistribution)
                                   .map( browserEntry => {
                                        return browserEntry.slice(browserEntry.indexOf("(")+1,browserEntry.indexOf(";"))
                                    });
        const browserData = Object.entries( stats.browserDistribution )
                                    .map( browserEntry =>  browserEntry[1])         // [ [browserName1, browserCount1], [browserName2, browserCount2] ]
        const pieData = {
            series: browserData,
            type: "donut",
            height: "700px",
            options: {
                pie: {
                    height: "100%",
                },
                labels: browserNames,
                legend: {
                    show: true, //hide legend
                },
            },
        };
        return ( 
            <Card title="Browser Distribution">
                <Card.Body>
                    <Chart {...pieData} />
                </Card.Body>
            </Card>
        )
    }

    
    const [inputData, setinputData] = useState("");
    let handleChange = (e) => setinputData(e.target.value)
    const modalAction = () => {};
    useEffect(() => {
        if(authDate && authDate.length > 0) {
            const storedDate = new Date(authDate);
            const dayAgo = new Date() - 1000*60*60*24;
            if(storedDate > dayAgo) {
                setPasswordEntered(true);
                setModalShowing(false);
            } else {
                localStorage.setItem('authDate', '');
            }
        }
    }, [authDate])

    const processPasswordText = () => {
        if(inputData === "dashboard!") {
            setPasswordEntered(true);
            setModalShowing(false);
            localStorage.setItem('authDate', new Date());
        }
    }


    return (
        <>
            <Modal show={modalShowing} onHide={modalAction}>
                <Modal.Header >
                    <Modal.Title>Enter Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control   type="password"
                                        onChange={handleChange}
                                        value={inputData}
                                        placeholder="password"
                        />           
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={processPasswordText}>
                        Login
                </Button>
                </Modal.Footer>
            </Modal>
            
            {/* <Jumbotron> */}
                <Page.Content title="Dashboard" className={!passwordEntered  && "invisible"}>
                    <Grid.Row cards>
                        <Grid.Col sm={6} lg={3}>
                            {ipCard()}
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            {totalProductsClickedCard()}
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            <StatsCard
                                label="Total Scraped Products"
                                layout={3}
                                movement={0}
                                total={"?"}
                            />
                        </Grid.Col>
                        <Grid.Col sm={6} lg={3}>
                            <StatsCard
                                label="Last Scrape Date"
                                layout={3}
                                movement={0}
                                total={"?"}
                            />
                        </Grid.Col>
                    </Grid.Row>
                    <br />
                    <Grid.Row cards>
                        <Grid.Col sm={6} lg={6}>
                            {countriesCard()}
                        </Grid.Col>
                        <Grid.Col sm={2} lg={6}>
                            {browserDistributionCard()}
                        </Grid.Col>
                    </Grid.Row>
                </Page.Content>
            {/* </Jumbotron> */}
        </>
    )
}