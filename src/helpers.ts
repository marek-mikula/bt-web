import { WhaleAlert } from '~/types/http/Entities'
import { CURRENCY_SYMBOL } from '~/enums/common/Currency'

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

export function getWhaleAlertTransactionHasHref(alert: WhaleAlert): string {
  switch (alert.currency.symbol) {
    case CURRENCY_SYMBOL.BNB:
      return `https://bscscan.com/tx/${alert.hash}`
    case CURRENCY_SYMBOL.BTC:
      return `https://www.blockchain.com/explorer/transactions/btc/${alert.hash}`
    case CURRENCY_SYMBOL.ETH:
      return `https://www.blockchain.com/explorer/transactions/eth/${alert.hash}`
    case CURRENCY_SYMBOL.XRP:
      return `https://blockchair.com/ripple/transaction/${alert.hash}`
  }
}
