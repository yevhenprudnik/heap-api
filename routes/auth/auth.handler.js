import * as Service from '../../services/auth.service.js';

export const auth = body => {
  console.log('Auth handler triggered');

  return Service.auth(body.email, body.password);
};
