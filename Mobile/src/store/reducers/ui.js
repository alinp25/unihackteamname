import {UI_START_LOADING, UI_STOP_LOADING, UI_PAID_VERSION} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isTrial: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
            break;
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
            break;

        case UI_PAID_VERSION:
            return {
                ...state,
                isTrial: false
            }
            break;
        default:
            return state;
    }
}

export default reducer;