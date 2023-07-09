export interface LoginForm {
  email: string | null
  password: string | null
  rememberMe: boolean
}

export interface RegisterForm {
  firstname: string | null
  lastname: string | null
  email: string | null
  birthDate: string | null
  password: string | null
  passwordConfirm: string | null
  publicKey: string | null
  secretKey: string | null
}
