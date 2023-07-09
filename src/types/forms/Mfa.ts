export interface VerifyForm {
  code: string | null
}

export interface ResetPasswordForm extends VerifyForm {
  password: string | null
  passwordConfirm: string | null
}
