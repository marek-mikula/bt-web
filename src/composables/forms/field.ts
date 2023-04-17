export function useField() {
  function renderLabel(label: string | null, isRequired: boolean): string {
    return isRequired
      ? (label ?? '') + ' <span class="text-red-400 font-bold">*</span>'
      : label ?? ''
  }

  return {
    renderLabel
  }
}
