import {LOAD_PULL_REQUESTS} from '../actions/index';

export default function(state={}, action) {
  switch(action.type) {
    case LOAD_PULL_REQUESTS: {
      let result = {};
      result[action.meta] = action.payload.data;
      return Object.assign(result, state);      
    }
  }
  return state;
}