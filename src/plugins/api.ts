import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { AccountingCreateDTO, AccountingFilterDTO } from '@/dto/AccountingDTO';
import { LoginDTO, RegisterDTO } from '@/dto/AuthDTO';
import { CategoryCreateDTO, CategoryDTO } from '@/dto/CategoryDTO';

const axiosWithAuth = async () => {
  if (localStorage.getItem('token')) {
    return axios.create({
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  }

  const session = await getSession();

  const token = session?.user.token;

  localStorage.setItem('token', token ?? '');

  return axios.create({
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any) => {
  if (err.response?.status === 401) {
    localStorage.removeItem('token');
    signOut();
  }

  return err;
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
    me: async () => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/auth/me')
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
  },
  accounting: {
    all: async (filter: AccountingFilterDTO = {}) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/accounting', { params: filter })
        .then((res) => res.data)
        .catch((err) => errorHandler(err));
    },
    show: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/accounting/${id}`)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    create: async (data: AccountingCreateDTO) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .post('/api/accounting', data)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    destroy: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .delete(`/api/accounting/${id}`)
        .then((res) => res.status === 204)
        .catch(() => false);
    },
    update: async (id: number, data: AccountingCreateDTO) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .put(`/api/accounting/${id}`, data)
        .then((res) => res.status === 200)
        .catch(() => false);
    },
  },
  category: {
    all: async () => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/category')
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    create: async (data: CategoryCreateDTO) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .post('/api/category', data)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    show: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/category/${id}`)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    update: async (id: number, data: CategoryDTO) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .put(`/api/category/${id}`, data)
        .then((res) => res.status === 200)
        .catch(() => false);
    },
    destroy: async (id: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .delete(`/api/category/${id}`)
        .then((res) => res.status === 204)
        .catch(() => false);
    },
  },
  charts: {
    rangeCost: async (from: string, end: string) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/charts/range_cost', {
          params: {
            from,
            end,
          },
        })
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    typeCost: async (from: string, end: string) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get('/api/charts/type_cost', {
          params: {
            from,
            end,
          },
        })
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    target: async ({ year, month }: { year: number; month: number }) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/charts/target/${year}/${month}`)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    compareCost: async (from: string, end: string) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/charts/compare_cost`, { params: { from, end } })
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
  },
  reports: {
    getYearReports: async (year: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/reports/get_year_reports/${year}`)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
    getMonthReports: async (year: number, month: number) => {
      const axiosAuth = await axiosWithAuth();

      return axiosAuth
        .get(`/api/reports/get_month_reports/${year}/${month}`)
        .then((res) => res)
        .catch((err) => errorHandler(err));
    },
  },
};

export default $api;
