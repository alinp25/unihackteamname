import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import userPic from '../../assets/user.jpg';
import bicycle from '../../assets/bicycle.png';
import bus from '../../assets/bus.png';
import car from '../../assets/car.png';
import walk from '../../assets/walk.png';
import { setTransportMode } from '../../store/actions/index';
import { connect } from "react-redux";

class DirectionsMenuScreen extends Component {

    setTransportMode = (trMode) => {
        this.props.onSetTransportMode(trMode);
        
        setTimeout(() => { 
            this.props.navigator.push({
              screen: "awesome-places.DirectionsScreen",
              title: "Directions",
              passProps: {
                  transportMode: trMode
              }
            })
          }, 1000);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.userDetails}>
                    <Image source={userPic} style={{width: 60, height: 60, borderRadius: 40}}/>
                    <Text style={{fontWeight:'bold', fontSize: 25, color:'white'}}>Hi, Eusebiu!</Text>
                    <Text style={{fontSize: 15, color:'yellow'}}>Your current score is: 96</Text>
                </View>
                <View style={styles.menuContainer}>
                    <Text style={{fontWeight:'bold', fontSize: 20}}>How do you get to your destination?</Text>
                    <View style={styles.menuRow}>
                        <TouchableOpacity onPress={() => {this.setTransportMode(1)}} style={styles.icon}>
                            <Image source={walk} style={{width:45, height: 45}}/>
                            <Text>By walking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setTransportMode(2)}} style={styles.icon}>
                            <Image source={bicycle} style={{width:45, height: 45}}/>
                            <Text>Using my bike</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuRow}>
                        <TouchableOpacity onPress={() => {this.setTransportMode(4)}} style={styles.icon}>
                            <Image source={car} style={{width:45, height: 45}}/>
                            <Text>Using my car</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setTransportMode(3)}} style={styles.icon}>
                            <Image source={bus} style={{width:45, height: 45}}/>
                            <Text>Using mass transit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    userDetails: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "30%",
        backgroundColor: "#1d2530"
    },
    menuContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#eee'
    },
    menuRow: {
        flex:1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
  
  const mapDispatchToProps = dispatch => {
    return {
      onSetTransportMode: (mode) => dispatch(setTransportMode(mode))
    }
  }
  
  export default connect(null, mapDispatchToProps)(DirectionsMenuScreen);