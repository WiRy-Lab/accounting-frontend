import axios from 'axios';
import { LoginDTO, RegisterDTO } from '@/dto/AuthDTO';
import { AccountingCreateDTO, AccountingFilterDTO } from '@/dto/AccountingDTO';
import { getSession } from 'next-auth/react';

const axiosWithAuth = async () => {
  const session = await getSession();

  const token = session?.user.token;

  return axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

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
  accounting: {
    all: async (filter: AccountingFilterDTO = {}) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/accounting', { params: filter })
        .then((res) => res.data)
        .catch((err) => err);
    },
    show: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/accounting/${id}`)
        .then((res) => res)
        .catch((err) => err);
    },
    create: async (data: AccountingCreateDTO) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .post('/api/accounting', data)
        .then((res) => res)
        .catch((err) => err);
    },
    destroy: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .delete(`/api/accounting/${id}`)
        .then((res) => res.status === 204)
        .catch(() => false);
    },
  },
  category: {
    all: async () => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/category')
        .then((res) => res)
        .catch((err) => err);
    },
  },
};

export default $api;
