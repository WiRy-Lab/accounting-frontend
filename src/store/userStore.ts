// zustand
import { create } from 'zustand';

type UserObj = {
  email: string;
  account: string;
  exp: number;
  iat: number;
  jti: string;
  name: string;
  token: string;
};

export interface UserState {
  user: UserObj;
  setUser: (user: UserObj) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {
    email: '',
    account: '',
    exp: 0,
    iat: 0,
    jti: '',
    name: '',
    token: '',
  },
  setUser: (user: UserObj) => set(() => ({ user })),
}));
