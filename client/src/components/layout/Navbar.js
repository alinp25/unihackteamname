import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();

        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        console.log(window.location.pathname);
        if (Object.keys(user).length !== 0) { // AUTHENTICATED
            return (
                <div className="nav-wrapper">
                    <nav className="z-depth-0">
                        <div className="nav-wrapper white">
                            <div className="row">
                                <div className="col s1 center-align">
                                    <Link to="/"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="black-text"
                                        >
                                        SmarTM
                                    </Link>
                                </div>
                                <div className="col s1 center-align">
                                    <Link to="/maps"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="center black-text"
                                        >
                                        Maps 
                                    </Link>
                                </div>
                                <div className="col s1 center-align">
                                    <Link to="/monitor"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="black-text"
                                        >
                                        Monitor
                                    </Link>
                                </div>
                                <div className="col s1 center-align">
                                    <Link to="/indoor"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="black-text"
                                        >
                                        Indoor
                                    </Link>
                                </div>
                                <div className="col s1 offset-s7 center-align">
                                    <Link to="/"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="black-text"
                                        onClick={this.onLogoutClick}
                                        >
                                        Log out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        } else { // UNAUTHENTICATED
            return (
                <div className="navbar-fixed">
                    <nav className="z-depth-0">
                        <div className="nav-wrapper white">
                            <div className="row">
                                <div className="col s1 center-align">
                                    <Link to="/"
                                        style={{fontFamily: 'monospace', fontSize: 24}}
                                        className="col s5 center brand-logo black-text"
                                        >
                                        SmarTM
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);


// export default Navbar;