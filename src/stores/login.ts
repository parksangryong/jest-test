import { create } from "zustand";

interface signupTypes {
  email: string;
  password: string;
  Signup: ({ email, password }: any) => void;
}
//타입선언

export const useSignUpData = create<signupTypes>()((set, get) => ({
  email: "",
  password: "",
  Signup: ({ email, password }: any) =>
    set({
      email: email,
      password: password,
    }),
}));
