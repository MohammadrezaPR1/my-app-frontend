import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "../constants/videoConstants"


export const videoReducer = (state = { videos: [] }, action) => {
    switch (action.type) {
        case VIDEO_REQUEST:
            return { loading: true, videos: [] };
        case VIDEO_SUCCESS:
            return { loading: false, videos: action.pyload };
        case VIDEO_FAIL:
            return { loading: false, error: action.pyload };
        default:
            return state;
    }

}
