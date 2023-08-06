<template>
  <div>
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div
      v-if="menu.outer"
      class="relative z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <!--
        Off-canvas menu backdrop, show/hide based on off-canvas menu state.
      -->
      <transition
        enter-active-class="transition-opacity ease-linear duration-500"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-500"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        :duration="500"
      >
        <div v-if="menu.inner" class="fixed inset-0 bg-gray-900/80"></div>
      </transition>

      <div class="fixed inset-0 flex">
        <!--
          Off-canvas menu, show/hide based on off-canvas menu state.
        -->
        <transition
          enter-active-class="transition ease-in-out duration-500 transform"
          enter-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in-out duration-500 transform"
          leave-class="translate-x-0"
          leave-to-class="-translate-x-full"
          :duration="500"
        >
          <div
            v-if="menu.inner"
            class="relative mr-16 flex w-full max-w-xs flex-1"
          >
            <!--
              Close button, show/hide based on off-canvas menu state.
            -->
            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                class="-m-2.5 p-2.5"
                @click.prevent="closeMenu"
              >
                <span class="sr-only">Close sidebar</span>
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <CommonMenu
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <CommonMenu
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
      />
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click.prevent="openMenu"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form
            class="relative flex flex-1"
            action="#"
            method="GET"
            @submit.prevent="search"
          >
            <label for="search-field" class="sr-only"> Search </label>
            <svg
              class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              id="search-field"
              v-model="searchQuery"
              class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              class="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              @click.prevent="openPanel"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <span
                v-if="unreadNotifications > 0"
                class="absolute top-0 right-0 inline-flex h-4 w-5 items-center justify-center rounded-full bg-red-500 text-xxs text-white"
              >
                {{ unreadNotifications > 99 ? '99+' : unreadNotifications }}
              </span>
            </button>

            <!-- Separator -->
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              aria-hidden="true"
            ></div>

            <!-- Profile dropdown -->
            <div class="relative">
              <button
                id="user-menu-button"
                type="button"
                class="-m-1.5 flex items-center p-1.5"
                :aria-expanded="userDropdown.state.value ? 'true' : 'false'"
                aria-haspopup="true"
                @click.prevent="userDropdown.show"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="ml-4 hidden lg:flex lg:items-center">
                  <!-- ml-4 with profile pic -->
                  <span
                    class="text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                    >{{ user.fullName }}</span
                  >
                  <svg
                    class="ml-2 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <CommonDropdown
                :model="userDropdown"
                horizontal="right"
                vertical="bottom"
                class="divide-y divide-gray-100"
              >
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <div class="py-1" role="none">
                  <a
                    id="menu-item-4"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    >Your profile</a
                  >
                  <a
                    id="menu-item-5"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    >Account settings</a
                  >
                </div>
                <div class="py-1" role="none">
                  <a
                    id="menu-item-6"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    @click.prevent="logout"
                    >Sign out</a
                  >
                </div>
              </CommonDropdown>
            </div>
          </div>
        </div>
      </div>

      <main class="p-4 sm:p-6 lg:p-8">
        <Nuxt />
      </main>
    </div>

    <div
      v-if="panel.outer"
      class="relative z-50"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <!--
        Background backdrop, show/hide based on slide-over state.
      -->
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        :duration="500"
      >
        <div
          v-if="panel.inner"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
      </transition>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <!--
              Slide-over panel, show/hide based on slide-over state.
            -->
            <transition
              enter-active-class="transform transition ease-in-out duration-500"
              enter-class="translate-x-full"
              enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in-out duration-500"
              leave-class="translate-x-0"
              leave-to-class="translate-x-full"
              :duration="500"
            >
              <NotificationPanel v-if="panel.inner" @closed="closePanel" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  useRoute,
  useRouter,
  useStore,
  watch
} from '@nuxtjs/composition-api'
import { useUser } from '~/composables/user'
import { delay } from '~/helpers'
import { useDropdown } from '~/composables/dropdown'
import { StringMap } from '~/types/common/Common'

const router = useRouter()
const { getUser, logout } = useUser()
const user = getUser()
const route = useRoute()
const { getDropdown } = useDropdown()
const store = useStore()

const menu = reactive<StringMap<boolean>>({
  outer: false,
  inner: false
})

const panel = reactive<StringMap<boolean>>({
  outer: false,
  inner: false
})

const userDropdown = getDropdown('user-menu-button')
const searchQuery = ref<string | null>(null)

const unreadNotifications = computed<number>(
  () => store.getters['notification/unreadNotifications']
)

async function search(): Promise<void> {
  await router.push({ path: '/app/search', query: { q: searchQuery.value } })
  searchQuery.value = null
}

async function openMenu(): Promise<void> {
  menu.outer = true

  await delay(5)

  menu.inner = true
}

async function closeMenu(): Promise<void> {
  menu.inner = false

  await delay(500) // wait for animation to end

  menu.outer = false
}

async function openPanel(): Promise<void> {
  panel.outer = true

  await delay(5)

  panel.inner = true
}

async function closePanel(): Promise<void> {
  panel.inner = false

  await delay(500) // wait for animation to end

  panel.outer = false
}

// close menu on route change
watch(
  () => route.value,
  (): void => {
    closeMenu()
  }
)

onMounted(async (): Promise<void> => {
  await store.dispatch('notification/fetchUnreadNotifications')
})
</script>

<script lang="ts">
export default {
  name: 'AppLayout'
}
</script>
