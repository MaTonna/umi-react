import { post } from './util';

export default {
  userLogin: (params: { cell?: string; nickName?: string; loginPassword: string }) => {
    return post('/home/userLogin', params);
  },
};
