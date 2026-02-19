import { CATEGORY_NEWS_FAIL, CATEGORY_NEWS_REQUEST, CATEGORY_NEWS_SUCCESS } from "../constants/categoryNewsConstants";


export const categoryNewsReducer = (state = { categoryNews: [] }, action) => {
    switch (action.type) {
        case CATEGORY_NEWS_REQUEST:
            return { loading: true, categoryNews: [] };
        case CATEGORY_NEWS_SUCCESS:
            return { loading: false, categoryNews: action.pyload };
        case CATEGORY_NEWS_FAIL :
            return { loading: false, error: action.pyload };
        default:
            return state;
    }

}
