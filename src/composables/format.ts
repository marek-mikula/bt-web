import { ref } from 'vue'

export function useFormat() {
  const formatters = ref<{
    [key: string]: ReturnType<typeof Intl.NumberFormat>
  }>({})

  function getFractionDigits(value: number): number {
    // whole numbers
    if (value % 1 === 0) {
      return 0
    }

    if (value === 0.0) {
      return 2
    }

    value = value < 0.0 ? -1 * value : value

    let fractionDigits = 0
    let i = 1.0

    while (value < i) {
      fractionDigits += 2
      i /= 100
    }

    return fractionDigits > 0 ? fractionDigits : 2
  }

  function getFormatter(
    key: string,
    getter: () => ReturnType<typeof Intl.NumberFormat>
  ): ReturnType<typeof Intl.NumberFormat> {
    if (!(key in formatters.value)) {
      formatters.value[key] = getter()
    }
    return formatters.value[key]
  }

  function getPercentageFormatter(
    fractionDigits: number
  ): ReturnType<typeof Intl.NumberFormat> {
    return getFormatter(
      `percentage-${fractionDigits}`,
      () =>
        new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: fractionDigits
        })
    )
  }

  function getCurrencyFormatter(
    currency: string,
    fractionDigits: number
  ): ReturnType<typeof Intl.NumberFormat> {
    return getFormatter(
      `${currency}-${fractionDigits}`,
      () =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: fractionDigits
        })
    )
  }

  function getNumberFormatter(
    fractionDigits: number
  ): ReturnType<typeof Intl.NumberFormat> {
    return getFormatter(
      `number-${fractionDigits}`,
      () =>
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: fractionDigits
        })
    )
  }

  function formatCurrency(value: number, currency: string): string {
    return getCurrencyFormatter(currency, getFractionDigits(value)).format(
      value
    )
  }

  function formatPercent(value: number): string {
    return getPercentageFormatter(getFractionDigits(value * 100)).format(value)
  }

  function formatCryptocurrency(value: number, currency: string): string {
    return (
      getNumberFormatter(getFractionDigits(value)).format(value) +
      ` ${currency.toUpperCase()}`
    )
  }

  return {
    formatCurrency,
    formatPercent,
    formatCryptocurrency
  }
}
