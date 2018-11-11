import axios from 'axios';

import {LOAD_REPOSITORIES} from './index';
import {CONFIG} from '../../config';

export function loadRepositories() {
  const url = `${CONFIG.serverUrl}/github/repositories`;
  const request = axios.get(url);
  return {
    type: LOAD_REPOSITORIES,
    payload: request
  };
}

