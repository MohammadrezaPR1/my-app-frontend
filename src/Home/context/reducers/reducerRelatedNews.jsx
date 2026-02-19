import { RELATED_NEWS_FAIL, RELATED_NEWS_REQUEST, RELATED_NEWS_SUCCESS } from "../constants/relatedNewsConstants";




export const relatedNewsReducer = (state = { relatedNews: [] }, action) => {
    switch (action.type) {
        case RELATED_NEWS_REQUEST:
            return { loading: true, relatedNews: [] };
        case RELATED_NEWS_SUCCESS:
            return { loading: false, relatedNews: action.pyload };
        case RELATED_NEWS_FAIL:
            return { loading: false, error: action.pyload };
        default:
            return state;
    }

}
