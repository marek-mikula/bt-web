export interface ToastArguments {
  title: string
  message?: string | null
  closable?: boolean
  timeout?: number // time in seconds
  progress?: boolean
  onRemove?: () => Promise<void> | null
}
