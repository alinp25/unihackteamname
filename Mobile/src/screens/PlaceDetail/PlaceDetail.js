import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <ScrollView>
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View style={styles.textContainer}>
                <Text style={styles.textHeaders}>Weather</Text>
                <Text>Temp: {this.props.selectedPlace.placeDetails.weather.main.temp}</Text>
                <Text>Pressure: {this.props.selectedPlace.placeDetails.weather.main.pressure}</Text>
                <Text>Humidity: {this.props.selectedPlace.placeDetails.weather.main.humidity}</Text>
                <Text>Wind speed: {this.props.selectedPlace.placeDetails.weather.wind.speed}</Text>
                <Text style={styles.textHeaders} >Pollution level</Text>
                <Text>Carbon monoxide concentration: {this.props.selectedPlace.placeDetails.pollution.pollutants.co.concentration}</Text>
                <Text>Nitrogen dioxide concentration: {this.props.selectedPlace.placeDetails.pollution.pollutants.no2.concentration}</Text>
                <Text>Sulfur dioxide concentration: {this.props.selectedPlace.placeDetails.pollution.pollutants.so2.concentration}</Text>
                <Text style={styles.textHeaders} >Recommendations</Text>
                <Text>Children: {this.props.selectedPlace.placeDetails.pollution.random_recommendations.children}</Text>
                <Text>Health: {this.props.selectedPlace.placeDetails.pollution.random_recommendations.health}</Text>
                <Text>Outside: {this.props.selectedPlace.placeDetails.pollution.random_recommendations.outside}</Text>
                <Text style={styles.textHeaders} >Cars number</Text>
                <Text>Cars: {this.props.selectedPlace.carNumber}</Text>
            </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: 250
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  map: {
    width: "100%",
    height:300
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  },
  textHeaders: {
      fontSize: 25,
      fontWeight: "bold",
      paddingTop: 5
  },
  textContainer: {
      padding: 20
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
