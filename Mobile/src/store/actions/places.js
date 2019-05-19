import { SET_PLACES, SET_POLLUTION_DETAILS, SET_TRANSPORT_MODE } from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let details = null;
        dispatch(uiStartLoading());

        fetch("https://pollutionappapi.azurewebsites.net/api/HttpTrigger1?code=pdCfjvAHrbdHaOIIWes4sG2onh1hG8rHE5wekhQ8j9P3pI69URcMcw==&lat="+location.latitude+"&lon="+location.longitude+"")
        .then(res => res.json())
        .then(res => {
        
            details = res
        
            return fetch("https://us-central1-gb-project-free.cloudfunctions.net/storeImage", {
            method:"POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
    })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl,
                placeDetails: details,
                carNumber: 0
            };

            return fetch("https://gb-project-free.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        }).catch(err => {
            console.log(err)
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
            dispatch(getPlaces());
            dispatch(uiStopLoading());
        });;
    };
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://gb-project-free.firebaseio.com/places.json")
        .catch(err => {
            alert("Failed loading places!");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

export const getPollutionDetails = (location) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://pollutionappapi.azurewebsites.net/api/HttpTrigger1?code=pdCfjvAHrbdHaOIIWes4sG2onh1hG8rHE5wekhQ8j9P3pI69URcMcw==&lat="+location.latitude+"&lon="+location.longitude+"")
        .catch(err => {
            alert("Failed getting pollution details!");
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(setPollutionDetails(parsedRes));
            dispatch(uiStopLoading());
        });
    };
};

export const setTransportMode = (mode) => {
    return {
        type: SET_TRANSPORT_MODE,
        transportMode: mode
    }
}

export const setPollutionDetails = details => {
    return {
        type: SET_POLLUTION_DETAILS,
        pollutionDetails: details
    }
}
