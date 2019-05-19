import React from 'react';
import { View, StyleSheet, Dimensions, Button, ScrollView, Text, ActivityIndicator } from 'react-native';
import MapView, {Polyline} from "react-native-maps";
import { getPollutionDetails } from '../../store/actions/index';
import { connect } from "react-redux";


class PollutinScreen extends React.Component {

  static navigatorStyle = {
    navBarButtonColor: "green"
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  state = {
    focusedLocation: {
      latitude: 45.755262, 
      longitude: 21.227627,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false,
    colors:['rgba(0,255,0,0.4)','rgba(60, 255 ,0 ,0.4)','rgba(153, 255 ,0 ,0.4)','rgba(187, 255 ,0 ,0.4)','rgba(255 ,255 ,0 ,0.4)','#ffbb00','rgba(255, 153 ,0 ,0.4)','rgba(255, 60 ,0 ,0.4)','rgba(255, 0 ,0 ,0.4)','rgba(255, 0 ,0 ,0.4)'],
      circles: [
        {
          lat: 45.750326,
          lng: 21.190078,
          level: 9,
          radius: 500
      }, 
      {
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
      }
    ],
    coordinates: [
      {
        latitutde:45.745262, 
        longitude:  21.246456
      },
      {
        latitutde:45.746262, 
        longitude:  21.246456
      },
      {
        latitutde:45.747262, 
        longitude:  21.246456
      },
      {
        latitutde:45.748262, 
        longitude:  21.246456
      }
    ]
  };


  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

  showDetails = () => {
    this.props.onLoadPollutionDetails(this.state.focusedLocation)

    
    setTimeout(() => { 
      this.props.navigator.push({
        screen: "awesome-places.PollutionPlaceDetailsScreen",
        title: "Pollution level details",
        passProps: {
        }
      })
    }, 1000);
    
  }

  render  () {
    const circlesList = this.state.circles.map((circle, key) => {
      let r = circle.level > 5 ? circle.level * 50 : 0;
      let g = circle.level <= 5 ? circle.level * 50 : 0;
      return (<MapView.Circle 
        center={{latitude: circle.lat, longitude: circle.lng}}
        radius={circle.radius}
        fillColor={this.state.colors[circle.level]}
        strokeColor={this.state.colors[circle.level]}
              />);
      })

    let marker = null;
    let detailsButton = 
      <Text>Select spot on the map or click locate me to find details about polluon in that place!</Text>
    

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
      detailsButton = <Button title="Find details" onPress={this.showDetails} disabled={!this.state.locationChosen}/>;
    }

    if(this.props.isLoading) {
      detailsButton = <ActivityIndicator />
    }
    

    return (
      <ScrollView>
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.focusedLocation}
            style={styles.map}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
          >
            {marker}
            {circlesList}
          </MapView>
          <View style={styles.button}>
            <Button title="Locate Me" onPress={this.getLocationHandler} />
          </View>
          <View style={this.state.locationChosen ? styles.button : styles.detailsText}>
            {detailsButton}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height * 0.8,
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: "80%"
  },
  button: {
    margin: 8
  },
  detailsText: {
    width: "75%"
  }
})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    isTrial: state.ui.isTrial,
    pollutionDetails: state.places.pollutionDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPollutionDetails: (focusedLocation) => dispatch(getPollutionDetails(focusedLocation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollutinScreen);