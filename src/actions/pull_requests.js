import axios from 'axios';

import {LOAD_PULL_REQUESTS} from './index';
import {CONFIG} from '../../config';

export function loadPullRequests(repo) {
  const url = `${CONFIG.serverUrl}/github/repositories/${repo}/pulls`;
  const request = axios.get(url);
  return {
    type: LOAD_PULL_REQUESTS,
    payload: request,
    meta: repo
  };
}