import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import firstImage from '../../images/carousel/firstImage.jpg';
import secondImage from '../../images/carousel/secondImage.jpg';
import thirdImage from '../../images/carousel/thirdImage.jpg';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
    
    render() {
        const carouselImage = {
            backgroundColor: "#000000",
            opacity: 0.8
        }
        const { user } = this.props.auth;
        return (
            <div className="row" height="100vh" style={{marginTop: 110}}>
                <div className="col s6 center-align">
                    <Carousel infiniteLoop emulateTouch dynamicHeight showThumbs={false} autoplay={true} showStatus={false}>
                        <div>
                            <img src={firstImage} style={carouselImage}/>
                        </div>
                        <div>
                            <img src={secondImage} style={carouselImage}/>
                        </div>
                        <div>
                            <img src={thirdImage} style={carouselImage}/>
                        </div>
                    </Carousel>
                </div> 
                <div className="col s6 center-align">
                    <div>
                        <h3>SmarTM - your city cleaner and smarter.</h3>
                        <p className="blue-text text-darken-2">Traffic and pollution monitor for a better city and a healthier life</p>
                        <p className="indigo-text text-darken-2">Team[TeamName] - Unihack</p>
                        {Object.keys(user).length == 0 ? 
                            (<div>
                                <Link
                                    to="/login"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        marginRight: "15px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Login
                                </Link>
                                <Link
                                    style={{
                                        width: "150px",
                                        marginLeft: "15px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    to="/register"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Register
                                </Link>
                            </div>)
                        : (<div></div>)}

                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Landing);