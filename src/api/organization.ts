import { post } from './util';

export default {
  managerQuery: function (params: {}) {
    return post('/organization/managerQuery.json', params);
  },
};
