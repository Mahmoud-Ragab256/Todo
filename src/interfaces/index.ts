import type { TNameRegister, TNameLogin } from "../types";

export interface IInput {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  type: string;
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number
  }
}

export interface IInputRegister extends IInput {
  name: TNameRegister;
}
export interface IInputLogin extends IInput {
  name: TNameLogin;
}