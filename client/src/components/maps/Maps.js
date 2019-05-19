import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} from "react-google-maps";

class Maps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            circles: [{
                lat: 45.750326,
                lng: 21.190078,
                level: 9,
                radius: 500
            }, {
                lat: 45.753904,
                lng: 21.235252,
                level: 4,
                radius: 500
            }, {
                lat: 45.750326,
                lng: 21.201078,
                level: 9,
                radius: 500
            }, {
                lat: 45.750326,
                lng: 21.210078,
                level: 9,
                radius: 500
            }, {
                lat: 45.751260,
                lng: 21.235122,
                level: 4,
                radius: 600
            }, {
                lat: 45.754247,
                lng: 21.230723,
                level: 4,
                radius: 600
            }, {
                lat: 45.790897, 
                lng: 21.267835,
                level: 3,
                radius: 1200
            }, {
                lat: 45.744590, 
                lng: 21.223612,
                level: 7,
                radius: 700
            }, {
                lat: 45.740321, 
                lng: 21.270308,
                level: 10,
                radius: 1000
            }, {
                lat: 45.753904,
                lng: 21.235252,
                level: 4,
                radius: 200
            }, {
                lat: 45.734091, 
                lng: 21.243272,
                level: 1,
                radius: 500
            }, {
                lat: 45.730916, 
                lng: 21.224303,
                level: 5,
                radius: 500
            }, {
                lat: 45.753804,
                lng: 21.235252,
                level: 4,
                radius: 200
            }, {
                lat: 45.753904,
                lng: 21.235252,
                level: 4,
                radius: 200
            }, {
                lat: 45.753904,
                lng: 21.235252,
                level: 4,
                radius: 200
            }, {
                lat: 45.753904,
                lng: 21.235252,
                level: 4,
                radius: 200
            },
            {
                lat: 45.758169,
                lng: 21.204648,
                level: 2,
                radius: 500
            },
            {
                lat: 45.764097,
                lng:   21.201901,
                level: 7,
                radius: 200
            },
            {
                lat: 45.747928,
                lng:   21.254601,
                level: 2,
                radius: 300
            },
            {
                lat: 45.756492,
                lng:  21.242156,
                level: 2,
                radius: 300
            },
            {
                lat: 45.748228,
                lng:  21.236319,
                level: 4,
                radius: 350
            },
            {
                lat: 45.746491, 
                lng: 21.227050 ,
                level: 4,
                radius: 476
            },
            {
                lat:45.740441, 
                lng: 21.242242,
                level: 3,
                radius: 400
            },
            {
                lat: 45.735581,
                lng:  21.206021,
                level: 3,
                radius: 543
            },
            {
                lat: 45.736786,
                lng:   21.220836,
                level: 4,
                radius: 543
            },
            {
                lat: 45.761911, 
                lng:  21.225985,
                level: 4,
                radius: 343
            },
            {
                lat: 45.770892,
                lng:   21.236800,
                level: 5,
                radius: 653
            },
            {
                lat: 45.766342,
                lng:  21.215686,
                level: 4,
                radius: 765
            },
            {
                lat: 45.756641,
                lng:  21.261348,
                level: 6,
                radius: 564
            },
            {
                lat: 45.763468,
                lng:   21.252250,
                level: 7,
                radius: 564
            },
            {
                lat: 45.757001,
                lng: 21.249288,
                level: 9,
                radius: 600
            },
            {
                lat:45.745262, 
                lng:  21.246456,
                level: 9,
                radius: 300
            }],
            colorsCircle: ["#0440f2", "#3ac7ff", "#35fceb", "#caf103", "##8fef69", "##8fef69", "#8fef69", "#fff95e", "#ffa95e", "#ff2002"]
        }
    }

    setPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPos);
        }
        const thiss = this;
        function setPos(position) {
            thiss.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPos);
        }
        console.log('mount');
        const thiss = this;
        function setPos(position) {
            thiss.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }
    }

    render() {
        const points = [
            {location:[45.748460, 21.239668], weight: 2},
        ];
        console.log(this.state.circles);
        const circlesList = this.state.circles.map((circle, key) => 
            <Circle defaultCenter={{lat: circle.lat, lng: circle.lng}}
                key={key + "-key"}
                defaultRadius={circle.radius}
                options={{
                    fillColor: this.state.colorsCircle[circle.level - 1],
                    strokeWeight: 0
                }}
            />
        );

        const Map = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={13}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={{ lat: 45.748460, lng: 21.239668 }}
                onGoogleApiLoaded={({map, maps}) => {
                    console.log(points[0]);
                    const heatmap = new maps.visualization.HeatmapLayer({
                    data: points.map(point => (
                        {location: new maps.LatLng(point['location'][1], point['location'][0]),
                        weight: point['weight']}))
                    });
                    heatmap.setMap(map);
                }}
            >
                <Marker 
                    position={{lat: 45.748460, lng: 21.239668}}
                />
                {circlesList}
            </GoogleMap>
        ));

        const { user } = this.props.auth;
        
        return (
            <div style={{ height: "75vh" }} className="container">
                <div>
                    <p></p>
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpI4PUz5jIR-LpXmAiya8wz2bYh7V3O18&v=3.exp&libraries=visualization,geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        defaultCenter={{ lat: 45.75372, lng: 21.22571 }}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        );
    }
}

Maps.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Maps);