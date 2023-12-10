type LoginDTO = {
  account: string;
  password: string;
  remember: boolean;
};

type RegisterDTO = {
  account: string;
  password: string;
  password_verify: string;
  email: string;
  name: string;
};

export type { LoginDTO, RegisterDTO };
