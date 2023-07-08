export function removeElement(element: HTMLElement): void {
  if (typeof element.remove !== 'undefined') {
    element.remove()
  } else {
    element.parentNode?.removeChild(element)
  }
}

export function delay(time: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, time))
}
