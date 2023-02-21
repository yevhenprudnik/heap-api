import * as Services from '../../services/example.service.js';

export const getHandler = () => {
  console.log('Example GET handler triggered');

  return Services.getFunction();
};

export const postHandler = body => {
  console.log('Example POST handler triggered');

  return Services.postFunction(body.input);
};
