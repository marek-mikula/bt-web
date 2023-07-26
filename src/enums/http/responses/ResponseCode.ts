export enum RESPONSE_CODE {
  OK = 'OK',
  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  TOKEN_MISMATCH = 'TOKEN_MISMATCH',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INVALID_CONTENT = 'INVALID_CONTENT',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  MFA_TOKEN = 'MFA_TOKEN',
  MFA_MISSING_TOKEN = 'MFA_MISSING_TOKEN',
  MFA_CORRUPTED_TOKEN = 'MFA_CORRUPTED_TOKEN',
  MFA_INVALID_TOKEN = 'MFA_INVALID_TOKEN',
  MFA_EXPIRED_TOKEN = 'MFA_EXPIRED_TOKEN',
  MFA_INVALID_CODE = 'MFA_INVALID_CODE',
  QUIZ_TAKEN = 'QUIZ_TAKEN',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS'
}
