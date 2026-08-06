import type { TNameRegister, TNameLogin } from "../types";

export interface IInputRegister {
  label: string;
  name: TNameRegister;
  id: string;
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number
  }
}
export interface IInputLogin {
  label: string;
  name: TNameLogin;
  id: string;
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number
  }
}