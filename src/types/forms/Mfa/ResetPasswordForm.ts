import VerifyForm from '~/types/forms/Mfa/VerifyForm'

export default interface ResetPasswordForm extends VerifyForm {
  password: string | null
  passwordConfirm: string | null
}
