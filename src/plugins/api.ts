import axios from 'axios';
import { LoginDTO, RegisterDTO } from '@/dto/AuthDTO';

const $api = {
  auth: {
    login: (data: LoginDTO) =>
      axios
        .post('/api/auth/login', data)
        .then((res) => res.data)
        .catch((err) => err.response),
    register: (data: RegisterDTO) =>
      axios
        .post('/api/auth/register', data)
        .then((res) => res.data)
        .catch((err) => err.response),
    me: () =>
      axios
        .get('/api/auth/me')
        .then((res) => res.data)
        .catch((err) => err.response),
  },
};

export default $api;
