/*
This is the landing page that will display when users first open the app. It has a title and a menu.
*/

import React from "react";
import { LinkContainer } from 'react-router-bootstrap'
// import { Button } from 'react-bootstrap'

import '../stylesheets/Home.css';

class Home extends React.Component {
    render() {
        this.whatever = 10;
        return <div>
            <h1 className="page-title">Extractor UI</h1>
            <div className="button-container">
                <LinkContainer to="/extract">
                    <button className="home-menu-button">Extract New</button>
                </LinkContainer>
            </div>
        </div>
    }
}


export default Home;