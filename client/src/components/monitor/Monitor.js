import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ReactPlayer from 'react-player';
import { Line } from 'rc-progress';

import trafficVideo1 from '../../vids/14.mp4';
import trafficVideo2 from '../../vids/5.mp4';
import trafficVideo3 from '../../vids/17.mp4';
import trafficVideo4 from '../../vids/15.mp4';
import trafficVideo5 from '../../vids/9.mp4';
import trafficVideo6 from '../../vids/11.mp4';
import trafficVideo7 from '../../vids/7.mp4';
import trafficVideo8 from '../../vids/3.mp4';
import trafficVideo9 from '../../vids/1.mp4';
import trafficVideo10 from '../../vids/13.mp4';
import trafficVideo11 from '../../vids/8.mp4';
import trafficVideo12 from '../../vids/6.mp4';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true,
            vehicles: 0,
            trafficVideos: [trafficVideo1, trafficVideo2, trafficVideo3, trafficVideo4, trafficVideo5, trafficVideo6, trafficVideo7, trafficVideo8, trafficVideo9, trafficVideo10, trafficVideo11, trafficVideo12],
            currentVideo: 0,
            carsCount: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 23, 24, 24, 24, 24, 24, 25, 25, 26, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 29, 29, 30, 30, 31, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35, 36, 36, 36, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 44, 44, 45, 45, 45, 45, 45, 45, 46, 46, 46, 46, 47, 48, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 52, 53, 53, 53, 53, 53, 54, 54, 54, 55, 55, 55, 55, 55, 55, 55, 55, 56, 56, 56, 56, 56, 56, 56, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 62, 62, 62, 62, 62, 63, 64, 64, 64, 65, 65, 66, 66, 66, 67, 67, 68, 69, 70, 70, 71, 71, 72, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 74, 74, 74, 74, 74, 74, 74, 74, 75, 75, 75, 75, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77, 77, 77, 77, 77, 78, 78, 78, 78, 78, 78, 78, 78, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 80, 80, 80, 80, 80, 80, 80, 80, 81, 81, 81, 81, 81, 81, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 84, 85, 85, 85, 85, 85, 85, 86, 87, 88, 88, 89, 89, 89, 89, 89, 89, 90, 90, 90, 90, 90, 91, 92, 93, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 95, 95, 95, 95, 95, 95, 96, 96, 96, 96, 97, 97, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 99, 99, 99, 100, 100, 100, 100, 100, 101, 101, 101, 101, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 103, 104, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 106, 106, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 108, 108, 108, 108, 108, 108, 108, 109, 109, 110, 110, 110, 110, 110, 110, 110, 110, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 112, 112, 112, 113, 113, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 11, 12, 12, 12, 13, 13, 14, 15, 15, 16, 16, 16, 16, 16, 16, 17, 18, 19, 20, 20, 20, 20, 20, 21, 22, 22, 22, 22, 23, 24, 25, 26, 26, 27, 28, 29, 29, 29, 30, 30, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 33, 34, 34, 35, 35, 35, 36, 36, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 45, 45, 46, 47, 47, 48, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 50, 50, 50, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 10, 11, 11, 11, 11, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 21, 21, 21, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 26, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 30, 31, 31, 31, 31, 31, 32, 33, 34, 34, 35, 36, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 41, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 44, 44, 45, 46, 46, 46, 46, 46, 46, 46, 46, 47, 47, 47, 47, 47, 47, 47, 48, 48, 49, 50, 50, 50, 50, 50, 50, 51, 51, 51, 52, 53, 53, 53, 53, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 55, 56, 56, 56, 56, 56, 57, 57, 57, 58, 58, 58, 58, 58, 58, 59, 59, 60, 60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 22, 22, 23, 24, 24, 24, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 34, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 36, 37, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 49, 49, 49, 50, 50, 51, 51, 51, 51, 51, 52, 52, 52, 52, 52, 52, 52, 53, 53, 53, 53, 53, 53, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 54, 55, 55, 55, 55, 55, 55, 56, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 60, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 62, 63, 63, 64, 65, 65, 66, 66, 66, 66, 66, 66, 66, 66, 66, 67, 67, 67, 67, 67, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 69, 70, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 72, 72, 73, 73, 73, 74, 74, 74, 75, 75, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77, 77, 77, 77, 77, 78, 78, 79, 79, 79, 79, 79, 79, 79, 79, 79, 80, 80, 80, 80, 80, 80, 80, 81, 81, 81, 81, 81, 81, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 84, 84, 84, 84, 85, 85, 85, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 87, 87, 87, 87, 87, 87, 87, 87, 88, 89, 90, 90, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 95, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 97, 98, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100, 100, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 102, 102, 102, 102, 102, 103, 103, 103, 103, 103, 103, 103, 104, 104, 104, 104, 104, 104, 105, 105, 105, 105, 105, 105, 106, 106, 107, 108, 108, 108, 108, 108, 109, 109, 109, 109, 110, 110, 111, 111, 111, 111, 112, 113, 113, 113, 113, 113, 114, 114, 114, 115, 115, 115, 115, 115, 115, 115, 115, 115, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 117, 117, 117, 117, 117, 117, 118, 118, 118, 118, 118, 118, 119, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 121, 121, 121, 122, 123, 123, 123, 123, 123, 124, 124, 124, 124, 124, 124, 124, 125, 125, 125, 125, 125, 125, 126]
        };
    }

    backToDashboard = e => {
        e.preventDefault()

        this.props.history.push('/dashboard');
    }

    componentDidMount() {
        this.setState({currentVideo: Math.floor(Math.random() * 10) % this.state.trafficVideos.length});
        fetch('http://www.geoplugin.net/json.gp').then(res => {
            res.json().then(position => {
                const URI = `https://pollutionappapi.azurewebsites.net/api/HttpTrigger1?code=pdCfjvAHrbdHaOIIWes4sG2onh1hG8rHE5wekhQ8j9P3pI69URcMcw==&lat=${position.geoplugin_latitude}&lon=${position.geoplugin_longitude}`;
                fetch(URI).then(jsonPromise => 
                    jsonPromise.json().then(data => {
                        this.setState({data: data, loading: false});
                    })
                );
            });
        })
    }

    onProgress = videoData => {
        const carCount = this.state.carsCount;
        console.log(carCount[Math.floor(videoData.playedSeconds * 15)]);
        this.setState({vehicles: Math.floor(carCount[Math.floor(videoData.playedSeconds * 15)] * 0.75 + Math.random() * 2)});
        console.log(this.state.vehicles);
    }    

    onCameraSwitch = (e) => {
        e.preventDefault();

        this.setState({vehicles: 0, currentVideo: (this.state.currentVideo + 1) % this.state.trafficVideos.length})
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <div className="row">
                                <div className="col s12 center-align">
                                    <p>Loading...</p>                              
                                </div>
                            </div>
                            <div className="row">
                                <button
                                    style={{
                                    width: "250px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                    }}
                                    onClick={this.backToDashboard}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ height: "75vh", marginTop: 30 }} className="container">
                    <div className="row">
                        <div className="col s12 center-align">
                            <div className="row">
                                <div className="col s12 center-align "> 
                                    <div className="row"> 
                                        <div className="col s6 ">
                                            <div style={styles.playerWrapper}>
                                                <ReactPlayer loop url={this.state.trafficVideos[this.state.currentVideo]} 
                                                            playing width="100%" height="100%" 
                                                            onProgress={this.onProgress}
                                                />                      
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
                                        <div className="col s6 " style={styles.dataset}>
                                            <h3>Pollution details</h3>
                                            <p style={styles.pStyle}>Position (lat, lon): {this.state.data.weather.coord.lat + ', ' + this.state.data.weather.coord.lon}</p>
                                            <p style={styles.pStyle}>State: {this.state.data.weather.sys.country} </p>
                                            <p style={styles.pStyle}>Humidity: {this.state.data.weather.main.humidity}</p>
                                            <p style={styles.pStyle}>Temperature: {this.state.data.weather.main.temp}</p>
                                            <p style={styles.pStyle}>Pressure: {this.state.data.weather.main.pressure}</p>
                                            <p style={styles.pStyle}>Concentration of Carbon Monoxide: {this.state.data.pollution.pollutants.co.concentration + this.state.vehicles * Math.floor(Math.random() * 10 + 10)}</p>
                                            <p style={styles.pStyle}>Level of pollution created by cars: </p>
                                            {/* <p style={styles.pStyle}>Vehicles counter: {this.state.vehicles}</p> */}
                                            <Line percent={this.state.vehicles >= 100 ? 100 : this.state.vehicles} strokeWidth="3" strokeColor="#5edeff" />
                                            <p style={styles.pStyle}>{this.state.data.pollution.random_recommendations.health}.</p>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const styles = {
    dataset: {
        fontFamily: 'Lato',
        background: '#fff',
        border: "4px solid #000",
        borderRadius: 3
    }, 
    playerWrapper: {
        width: "100%",
        height: '300px',
        margin: "auto"
    },
    pStyle: {
        fontSize: "18px"
    }
}

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
