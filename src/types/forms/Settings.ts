export interface SettingsAccountPersonalForm {
  firstname: string | null
  lastname: string | null
  birthDate: string | null
}

export interface SettingsAccountPasswordForm {
  oldPassword: string | null
  newPassword: string | null
  newPasswordConfirm: string | null
}

export interface SettingsAccountKeysForm {
  publicKey: string | null
  secretKey: string | null
}

export interface DeleteAccountForm {
  password: string | null
}
