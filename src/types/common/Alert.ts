export interface AlertAction {
  label: string
  handler: () => Promise<void>
}
