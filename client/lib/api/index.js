/**
 * API
 */
import { generateRequest } from 'fetchum';

export default {
  getCurrentUser: generateRequest({
    token: true,
    method: 'GET',
    route: '/v1/me',
  }),
  getPiplForFriend: generateRequest({
    token: true,
    method: 'GET',
    route: '/v1/pipl?first_name=:firstName&last_name=:lastName&fb_id=:fbId',
  }),
};
