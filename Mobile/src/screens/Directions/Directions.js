import React, {Component} from 'React';
import MapView , {Polyline} from "react-native-maps";
import {View, Text, Button, StyleSheet, Dimensions, Picker, ImageBackground, TextInput, TouchableNativeFeedback} from 'react-native';
import backgroundImage from "../../assets/background.jpg";

class DirectionsScreen extends Component {

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
        colors:['rgba(0,255,0,0.4)','rgba(60, 255 ,0 ,0.4)','rgba(153, 255 ,0 ,0.4)','rgba(187, 255 ,0 ,0.4)','rgba(255 ,255 ,0 ,0.4)','rgba(255,187,0,0.4)','rgba(255, 153 ,0 ,0.4)','rgba(255, 60 ,0 ,0.4)','rgba(255, 0 ,0 ,0.4)','rgba(255, 0 ,0 ,0.4)'],
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
        traseu: {
            traseu: null,
            traseuAles: false,
            sosire: null,
            denumireDestinatie: null,
            listaDestinatii: [],
            selectedDestination: null,
            pozitii: [],
            pozitieUser: null
        }
        
      };

    findList = () => {
        fetch('https://places.cit.api.here.com/places/v1/autosuggest?at=40.74917,-73.98529&q='+this.state.traseu.denumireDestinatie+'&app_id=1mrL1yEzLmkBrdnhSDJF&app_code=l0j44svPhZL1t2AHz4D2gA')
        .then(res => res.json())
        .then(parsedRes => {
            this.setState(prevState => {
                return {
                    traseu: {
                        ...prevState.traseu,
                        listaDestinatii: parsedRes.results
                    }
                }
            })
        });

        navigator.geolocation.getCurrentPosition(pos => {
            this.setState(prevState => {
                return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                },
                locationChosen: true
                };
            });
          },
        err => {
          console.log(err);
          alert("Fetching the Position failed, please pick one manually!");
        })
    }

    getRoute = () => {
        fetch('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=1mrL1yEzLmkBrdnhSDJF&app_code=l0j44svPhZL1t2AHz4D2gA&waypoint0=geo!'+
                                        this.state.focusedLocation.latitude+'%2C'+
                                        this.state.focusedLocation.latitude+'&waypoint1=geo!'+
                                        this.state.traseu.selectedDestination.position[0]+'%2C'+
                                        this.state.traseu.selectedDestination.position[0]
                                        +'&mode=fastest%3Bcar%3Btraffic%3Adisabled&fbclid=IwAR02QBdiFkfVOJDw1jZX5yAr4PNneNYGA7HORSndYFXON-Ezm6uBdyBT3Kg')
        .then(res => res.json())
        .then(parsedRes => {
            this.setState(prevState => {
                return {
                    traseu: {
                        ...prevState.traseu,
                        pozitii: parsedRes.response.route[0].leg[0].maneuver
                    }
                }
            })
        })
    }

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
        });

        let polyLine = null;

        if(this.state.traseu.pozitii.length > 0) {
            let coordinates = [];
            this.state.traseu.pozitii.map((e,i) => coordinates.push(e.position))
            
            console.log(coordinates)
        }
        const circlesTwo = this.state.traseu.pozitii.map(poz => {
            console.log(poz);
            return (<MapView.Circle 
                center={{latitude: poz.position.latitude, longitude: poz.position.longitude}}
                radius={50}
                fillColor={"#000000"}
                strokeColor={"#000000"}
                    />);
        })
        // console.log('pl: ' + JSON.stringify(polyLine));



        let content = null;   
        let butonNavigare = null;
        
        if(this.state.traseu.selectedDestination !== null) {
            butonNavigare = (
                <TouchableNativeFeedback onPress={() => {this.setState(prevState => {
                    return {
                        traseu: {
                            ...prevState.traseu,
                            traseuAles: true
                        }
                    }
                });
                this.getRoute();
                }}>
                        <View
                            style={{
                            margin: 50,
                            marginTop: 40,
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
                            Navigate
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
            )
        }

        if(this.state.traseu.traseuAles) {
            content = (<MapView
            initialRegion={this.state.focusedLocation}
            style={styles.map}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
          >
            {marker}
            {circlesList}
            {/* {circlesTwo} */}
            
          </MapView>)
        }
        else {
            content = (
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <Text style={{fontWeight:'bold', fontSize: 20, color:'white', marginTop: 50, marginBottom:20}}>Type destination</Text>
                    <TextInput
                            style={{height: 40, width:300, borderColor: 'gray', borderWidth: 1, backgroundColor:'#eee'}}
                            onChangeText={(text) => this.setState(prevState => {
                                return {
                                    traseu: {
                                        ...prevState.traseu,
                                        denumireDestinatie: text
                                    }
                                }
                            })}
                            value={this.state.traseu.denumireDestinatie}
                    />
                    <TouchableNativeFeedback onPress={this.findList}>
                        <View
                            style={{
                            margin: 50,
                            marginTop: 40,
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
                            Find route
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <Picker
                        selectedValue={this.state.traseu.selectedDestination}
                        style={{height: 40, width: 300, backgroundColor:'#eee'}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState(prevState => {
                                return {
                                    traseu: {
                                        ...prevState.traseu,
                                        selectedDestination: itemValue
                                    }
                                }
                            })
                        }>
                        {this.state.traseu.listaDestinatii.map((l, i) => {return <Picker.Item value={l} label={l.title + l.vicinity} key={i}  /> })}
                    </Picker>
                    {butonNavigare}
                </ImageBackground>
            )
        }
    
        let marker = null;
    
        if (this.state.locationChosen) {
          marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }        
    
        return (
            <View style={styles.container}>
              {content}
            </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    map: {
        width: "100%",
        height: "100%"
    }
})

export default DirectionsScreen;