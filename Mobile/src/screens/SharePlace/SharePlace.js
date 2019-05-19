import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text
} from "react-native";
import { connect } from "react-redux";

import { addPlace } from "../../store/actions/index";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "green"
  };

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  }

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
  };

  render() {
    let submitButton = (
      <Button
              title="Share the Place!"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid ||
                !this.state.controls.image.valid
              }
            />
    );

    if(this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    let content = 
    <ScrollView>
      <View style={styles.container}>
        <MainText>
          <HeadingText>Share a Place with us!</HeadingText>
        </MainText>
        <PickImage onImagePicked={this.imagePickedHandler} />
        <PickLocation onLocationPick={this.locationPickedHandler} />
        <PlaceInput
          placeData={this.state.controls.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
        <View style={styles.button}>
          {submitButton}
        </View>
      </View>
    </ScrollView>;

    if(this.props.isTrial) {
      content = <View style={styles.buttonContainer}>
                    <Text>Available only for full version!</Text>
                </View>
    }

    return (
        content
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    isTrial: state.ui.isTrial
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
