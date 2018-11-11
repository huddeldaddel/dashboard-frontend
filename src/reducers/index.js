import { combineReducers } from 'redux';
import pullRequests from './github_pull_requests_reducer';
import repositories from './repositories_reducer';
import trackerIterations from './tracker_iterations_reducer';

const rootReducer = combineReducers({
  pullRequests,
  repositories,
  trackerIterations
});

export default rootReducer;