import {
  SET_PLACES, SET_POLLUTION_DETAILS, SET_TRANSPORT_MODE
} from "../actions/actionTypes";

const initialState = {
  places: [],
  pollutionDetails: null,
  transportMode: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
    return {
      ...state,
      places: action.places
    }
    case SET_POLLUTION_DETAILS: 
    return {
      ...state,
      pollutionDetails: action.pollutionDetails
    }
    case SET_TRANSPORT_MODE: 
    return {
      ...state,
      transportMode: action.transportMode
    }
    default:
      return state;
  }
};

export default reducer;
