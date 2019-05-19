import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import skullImage from '../../assets/skull.png';
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import { connect } from "react-redux";

class PoluareDetalii extends Component {

    state = {
        progress: 0.5,
        pollutionBarColor: "rgb(0, 255, 0)"
    }

    componentDidMount() {
        this.animate();
      }
    
    animate() {
        let p = (Math.floor(Math.random() * 10) + 3)/10;
        let progress = 0;
        let r = 5;
        let g = 255;
        let b = 0;

        this.setState({ progress });
        setInterval(() => {
        progress += p/50;
        if (progress > p) {
            progress = p;
        }
        if (progress <= 0.5) {
            r += 10;
        }
        if (progress >= 0.5) {
            g -= 10;
        }
        this.setState({pollutionBarColor: "rgb("+r+"," + g + ","+ b +")"})

        this.setState({ progress });
        }, 50);
    }

    render () {
        let skull = null;

        let vreme = null;

        if(!this.props.isLoading) {
            vreme = 
            <View style={styles.textContainer}>
                <Text style={styles.textHeaders}>Weather</Text>
                <Text>Temp: {this.props.pollutionDetails.weather.main.temp}</Text>
                <Text>Pressure: {this.props.pollutionDetails.weather.main.pressure}</Text>
                <Text>Humidity: {this.props.pollutionDetails.weather.main.humidity}</Text>
                <Text>Wind speed: {this.props.pollutionDetails.weather.wind.speed}</Text>
                <Text style={styles.textHeaders} >Pollution level</Text>
                <Text>Carbon monoxide concentration: {this.props.pollutionDetails.pollution.pollutants.co.concentration}</Text>
                <Text>Nitrogen dioxide concentration: {this.props.pollutionDetails.pollution.pollutants.no2.concentration}</Text>
                <Text>Sulfur dioxide concentration: {this.props.pollutionDetails.pollution.pollutants.so2.concentration}</Text>
                <Text style={styles.textHeaders} >Recommendations</Text>
                <Text>Children: {this.props.pollutionDetails.pollution.random_recommendations.children}</Text>
                <Text>Health: {this.props.pollutionDetails.pollution.random_recommendations.health}</Text>
                <Text>Outside: {this.props.pollutionDetails.pollution.random_recommendations.outside}</Text>

            </View>
            
        }

        if(this.state.progress >= 0.66) {
            skull = <Image resizeMode="cover" source={skullImage} style={styles.skullImage} />
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <HeadingText>Pollution details</HeadingText>
                    </View>
                    <View style={styles.pollutionContainer}>
                        <Progress.Bar
                            style={styles.progress}
                            progress={this.state.progress}
                            intermediate={false}
                            height={30}
                            width={250}
                            color={this.state.pollutionBarColor}
                        />
                        <View>
                            {skull}
                        </View>
                    </View>
                    <View>
                        {vreme}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        padding: 20
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    progress: {
        margin: 10
    },
    pollutionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    skullImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    textHeaders: {
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: 5
    },
    textContainer: {
        padding: 20
    }

})



const mapStateToProps = state => {
    return {
      isLoading: state.ui.isLoading,
      isTrial: state.ui.isTrial,
      pollutionDetails: state.places.pollutionDetails
    };
  };
  
  
export default connect(mapStateToProps)(PoluareDetalii);
