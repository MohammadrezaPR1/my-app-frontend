import { POPULAR_NEWS_REQUEST,POPULAR_NEWS_SUCCESS,POPULAR_NEWS_FAIL } from "../constants/popularNewsConstants";


export const popularNewsReducer = (state = { popularNews: [] }, action) => {
    switch (action.type) {
        case POPULAR_NEWS_REQUEST:
            return { loading: true, popularNews: [] };
        case POPULAR_NEWS_SUCCESS:
            return { loading: false, popularNews: action.pyload };
        case POPULAR_NEWS_FAIL:
            return { loading: false, error: action.pyload };
        default:
            return state;
    }

}
