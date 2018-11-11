import {LOAD_CURRENT_ITERATION, LOAD_ITERATION} from '../actions/index';

export default function(state={}, action) {
  switch(action.type) {
    case LOAD_CURRENT_ITERATION: {
      let result = { current: action.payload.data };
      result[action.payload.data.number] = action.payload.data;
      return result;
    }
    case LOAD_ITERATION: {
      let value = action.payload.data;
      let result = Object.assign({ }, state);
      result[action.meta] = value;
      return result;
    }
  }
  return state;
}