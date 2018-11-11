import axios from 'axios';

import {LOAD_CURRENT_ITERATION, LOAD_ITERATION} from './index';
import {CONFIG} from '../../config';

const currentIterationUrl = `${CONFIG.serverUrl}/tracker/sprints/current`;
const specificIterationUrl = `${CONFIG.serverUrl}/tracker/sprints/`;

export function loadCurrentTrackerIteration() {
  const request = axios.get(currentIterationUrl);
  return {
    type: LOAD_CURRENT_ITERATION,
    payload: request
  };
}

export function loadTrackerIteration(number) {
  const request = axios.get(`${specificIterationUrl}${number}`);
  return {
    type: LOAD_ITERATION,
    payload: request,
    meta: number
  };
}