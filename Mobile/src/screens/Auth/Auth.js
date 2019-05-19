import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import NorImage from '../../assets/LOGO.png';

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
import { tryAuth } from "../../store/actions/index";
import { uiPaidVersion } from "../../store/actions/index";

class AuthScreen extends Component {

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarHidden: true
  };

  state = {
    log: false,
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  loginHandler = () => {
    // this.props.trialVersion();

    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };

    this.props.onLogin(authData);
    startMainTabs();
  };

  loginTrial = () => {
    startMainTabs();
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    let content = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.state.log) {
      content = <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Welcome!</Text>
              <Text style={{ color: 'white', fontSize: 20, marginBottom: 30 }}>Let's get you on board</Text>
            </View>
            <DefaultInput
              placeholder="Email Address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              borderRadius={5}
            />
            <View
              style={
                this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState("password", val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  borderRadius={5}
                  secureTextEntry
                />
              </View>
              {confirmPasswordControl}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <TouchableNativeFeedback
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid
            }>
            <View
              style={{
                margin: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: '#FF9F1C',
                height: 40,
                width: 300,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: 'white' }}>
                Register
                </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

    }
    else {
      content =
        <View style={styles.initContainer}>
          <View style={{
            paddingBottom: 30,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: '#707070',
            borderBottomWidth: 3,
            borderTopColor: '#707070',
            borderTopWidth: 3
          }}>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginTop: 20 }}>NATURE BASED</Text>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>ON</Text>
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>MACHINE LEARNING</Text>
          </View>
          <View>
            <TouchableNativeFeedback onPress={() => { this.setState({ log: true }) }}>
              <View
                style={{
                  margin: 50,
                  marginTop: 100,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: '#FF9F1C',
                  height: 40,
                  width: 300,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: 'white' }}>
                  Get started here
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.logoContainer}>
            <Image source={NorImage} style={styles.logo} />
            <View style={styles.logoText}>
              <Text style={{ color: 'white', fontWeight: "bold", fontSize: 20 }}>
                SMAR
            </Text>
              <Text style={{ color: 'white', fontSize: 20 }}>
                [TM]
            </Text>
            </View>
          </View>
        <ScrollView>
          {content}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "35%",
    height: "35%"
  },
  initContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    flex: 1,
    flexDirection: "row"
  },
  logoContainer: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData)),
    trialVersion: () => dispatch(uiPaidVersion())
  };
};

const mapStateToProps = state => {
  return {
    isTrial: state.ui.isTrial
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
