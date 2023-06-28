export function removeElement(element: HTMLElement): void {
  if (typeof element.remove !== 'undefined') {
    element.remove()
  } else {
    element.parentNode?.removeChild(element)
  }
}
