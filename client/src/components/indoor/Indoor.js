import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import office1 from "../../office/1.jpg";
import office2 from "../../office/2.jpg";
import office3 from "../../office/3.jpg";
import office4 from "../../office/4.jpg";
import office5 from "../../office/5.jpg";
import office6 from "../../office/6.jpg";

class Indoor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offices: [office1, office3, office4, office5, office6],
            shouldOpenWin: [false, false, false, true, true],
            people: [6, 4, 2, 15, 13],
            currentOffice: 0,
            peopleCounter: 0,
            shouldOpenWindow: false
        }
    }

    onCameraSwitch = (e) => {
        e.preventDefault();

        this.setState({ currentOffice: (this.state.currentOffice + 1) % this.state.offices.length })
    }

    render() {
        const carouselImage = {
            backgroundColor: "#000000",
            opacity: 0.8,
            height: "500px",
            maxWidth: "800px"
        }
        const { user } = this.props.auth;
        const images = this.state.offices.map((office, key) => <div>
            <img src={office} style={carouselImage} key={key.toString() + '-key'} />
        </div>);
        return (
            <div className="row" height="100vh" style={{marginTop: 110}}>
                <div className="col s6 center-align">
                    {images[this.state.currentOffice]}
                </div> 
                <div className="col s6 center-align">
                    <h3>Air details | Indoor</h3>
                    <p>People counter: {this.state.people[this.state.currentOffice]}</p>
                    <p>Should open window: {this.state.shouldOpenWin[this.state.currentOffice] ? "yes." : "no."}</p>
                    <button onClick={this.onCameraSwitch} style={{
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    lineHeight: 1.5,
                                                    fontSize: 17,
                                                    color: "#000",
                                                    padding: "1em 2em",
                                                    letterSpacing: "0.05rem",
                                                    border: "1px solid #000"
                                                }}>Next camera</button>  
                </div>
            </div>
        );
    }
}

Indoor.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Indoor);