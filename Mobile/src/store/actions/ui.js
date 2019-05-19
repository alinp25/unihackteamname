import {UI_START_LOADING, UI_STOP_LOADING, UI_PAID_VERSION} from './actionTypes'

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}

export const uiPaidVersion = () => {
    return {
        type: UI_PAID_VERSION
    }
}