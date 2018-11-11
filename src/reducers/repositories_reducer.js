import {LOAD_REPOSITORIES} from '../actions/index';

export default function(state = [], action) {
    if(LOAD_REPOSITORIES === action.type) {
        return action.payload.data;
    }
    return state;
}