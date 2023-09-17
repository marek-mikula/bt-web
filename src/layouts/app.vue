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
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        :duration="300"
      >
        <div v-if="menu.inner" class="fixed inset-0 bg-gray-900/80"></div>
      </transition>

      <div class="fixed inset-0 flex">
        <!--
          Off-canvas menu, show/hide based on off-canvas menu state.
        -->
        <transition
          enter-active-class="transition ease-in-out duration-300 transform"
          enter-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in-out duration-300 transform"
          leave-class="translate-x-0"
          leave-to-class="-translate-x-full"
          :duration="300"
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
          <CommonSearchBar class="relative flex flex-1" />
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
            <CommonDropdown
              class="relative"
              identifier="user-menu-button"
              horizontal="right"
              vertical="bottom"
              :width="44"
            >
              <template #button="{ identifier, toggle, state }">
                <button
                  :id="identifier"
                  type="button"
                  class="-m-1.5 flex items-center p-1.5"
                  :aria-expanded="state ? 'true' : 'false'"
                  aria-haspopup="true"
                  @click.prevent="toggle(true)"
                >
                  <span class="sr-only">
                    {{ $t('common.buttons.openOptions') }}
                  </span>
                  <!--                <img-->
                  <!--                  class="h-8 w-8 rounded-full bg-gray-50"-->
                  <!--                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"-->
                  <!--                  alt=""-->
                  <!--                />-->
                  <span class="flex items-center">
                    <!-- ml-4 with profile pic -->
                    <span class="inline-block text-gray-400 lg:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>

                    <span
                      class="hidden text-sm font-semibold leading-6 text-gray-900 lg:block"
                      aria-hidden="true"
                      >{{ user.fullName }}</span
                    >

                    <svg
                      class="hidden h-5 w-5 text-gray-400 lg:ml-2 lg:block"
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
              </template>
              <template #list="{ identifier, handleClick }">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <div class="divide-y divide-gray-200">
                  <div class="p-1" role="none">
                    <a
                      :id="`${identifier}-menu-item-0`"
                      href="#"
                      class="flex items-center rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                      role="menuitem"
                      tabindex="-1"
                      @click.prevent="
                        handleClick(redirect, { path: '/app/wallet' })
                      "
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="mr-2 h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                        />
                      </svg>
                      {{ $t('template.app.userDropdown.wallet') }}
                    </a>
                    <a
                      :id="`${identifier}-menu-item-1`"
                      href="#"
                      class="flex items-center rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                      role="menuitem"
                      tabindex="-1"
                      @click.prevent="
                        handleClick(redirect, { path: '/app/settings' })
                      "
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {{ $t('template.app.userDropdown.settings') }}
                    </a>
                  </div>
                  <div class="p-1" role="none">
                    <a
                      :id="`${identifier}-menu-item-2`"
                      href="#"
                      class="flex items-center rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                      role="menuitem"
                      tabindex="-1"
                      @click.prevent="handleClick(logout)"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="mr-2 h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      {{ $t('template.app.userDropdown.logout') }}
                    </a>
                  </div>
                </div>
              </template>
            </CommonDropdown>
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
        enter-active-class="ease-in-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        :duration="300"
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
              enter-active-class="transform transition ease-in-out duration-300"
              enter-class="translate-x-full"
              enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in-out duration-300"
              leave-class="translate-x-0"
              leave-to-class="translate-x-full"
              :duration="300"
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
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useStore,
  watch
} from '@nuxtjs/composition-api'
import { useUser } from '~/composables/user'
import { delay } from '~/helpers'
import { StringMap } from '~/types/common/Common'
import { useRedirect } from '~/composables/redirect'

const { getUser, logout } = useUser()
const { redirect } = useRedirect()
const user = getUser()
const route = useRoute()
const store = useStore()
const context = useContext()

const notificationInterval = ref<null | number>(null)

const menu = reactive<StringMap<boolean>>({
  outer: false,
  inner: false
})

const panel = reactive<StringMap<boolean>>({
  outer: false,
  inner: false
})

const unreadNotifications = computed<number>(
  () => store.getters['notification/unread']
)

async function openMenu(): Promise<void> {
  menu.outer = true

  await delay(5)

  menu.inner = true
}

async function closeMenu(): Promise<void> {
  menu.inner = false

  await delay(300) // wait for animation to end

  menu.outer = false
}

async function openPanel(): Promise<void> {
  panel.outer = true

  await delay(5)

  panel.inner = true
}

async function closePanel(): Promise<void> {
  panel.inner = false

  await delay(300) // wait for animation to end

  panel.outer = false
}

function initNotificationInterval(): void {
  notificationInterval.value = window.setInterval(async (): Promise<void> => {
    await store.dispatch('notification/fetchUnreadNotifications', context)
  }, 60 * 1000) // every minute
}

function destroyNotificationInterval(): void {
  if (!notificationInterval.value) {
    return
  }

  window.clearInterval(notificationInterval.value)
}

// close menu on route change
watch(
  () => route.value,
  (): void => {
    closeMenu()
  }
)

onMounted(async (): Promise<void> => {
  await store.dispatch('notification/fetchUnreadNotifications', context)
  initNotificationInterval()
})

onBeforeUnmount((): void => {
  destroyNotificationInterval()
})
</script>

<script lang="ts">
export default {
  name: 'AppLayout'
}
</script>
