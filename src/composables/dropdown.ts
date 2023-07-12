import { ref } from 'vue'
import { Dropdown } from '~/types/common/Dropdown'

export function useDropdown() {
  function getDropdown(): Dropdown {
    const state = ref<boolean>(false)

    function show(): void {
      state.value = true
    }

    function hide(): void {
      state.value = false
    }

    return {
      state,
      show,
      hide
    }
  }

  return {
    getDropdown
  }
}
