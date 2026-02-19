import { MOST_VIEW_FAIL, MOST_VIEW_REQUEST, MOST_VIEW_SUCCESS } from "../constants/mostViewConstants";


export const mostViewReducer = (state = { mostView: [] }, action) => {
    switch (action.type) {
        case  MOST_VIEW_REQUEST :
            return { loading: true, mostView: [] };
        case MOST_VIEW_SUCCESS :
            return { loading: false, mostView: action.pyload };
        case MOST_VIEW_FAIL:
            return { loading: false, error: action.pyload };
        default:
            return state;
    }

}
