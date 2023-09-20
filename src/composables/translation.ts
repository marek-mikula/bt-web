import { useContext } from '@nuxtjs/composition-api'
import { Translation } from '~/types/common/Common'

export function useTranslation() {
  const { $_, i18n } = useContext()

  function trans(translation: Translation): string {
    if ($_.isString(translation)) {
      return i18n.t(translation).toString()
    }

    return i18n.t(translation.key, translation.values ?? {}).toString()
  }

  return {
    trans
  }
}
