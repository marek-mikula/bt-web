<template>
  <div>
    <div class="flex h-16 shrink-0 items-center">
      <img
        class="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li>
              <NuxtLink
                to="/app"
                :class="
                  getClass('/app', activeLinkClass, defaultLinkClass, true)
                "
              >
                <svg
                  :class="
                    getClass('/app', activeSvgClass, defaultSvgClass, true)
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                {{ $t('pages.dashboard.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/app/cryptocurrencies"
                :class="
                  getClass(
                    '/app/cryptocurrencies',
                    activeLinkClass,
                    defaultLinkClass
                  )
                "
              >
                <svg
                  :class="
                    getClass(
                      '/app/cryptocurrencies',
                      activeSvgClass,
                      defaultSvgClass
                    )
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ $t('pages.cryptocurrency.list.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/app/whale-alerts"
                :class="
                  getClass(
                    '/app/whale-alerts',
                    activeLinkClass,
                    defaultLinkClass,
                    true
                  )
                "
              >
                <svg
                  :class="
                    getClass(
                      '/app/whale-alerts',
                      activeSvgClass,
                      defaultSvgClass,
                      true
                    )
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                {{ $t('pages.whaleAlerts.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/app/orders"
                :class="
                  getClass(
                    '/app/orders',
                    activeLinkClass,
                    defaultLinkClass,
                    true
                  )
                "
              >
                <svg
                  :class="
                    getClass(
                      '/app/orders',
                      activeSvgClass,
                      defaultSvgClass,
                      true
                    )
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                {{ $t('pages.orders.title') }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="mt-auto">
          <NuxtLink
            to="/app/settings"
            :class="
              getClass(
                '/app/settings',
                settingsActiveLinkClass,
                settingsDefaultClass
              )
            "
          >
            <svg
              :class="
                getClass('/app/settings', activeSvgClass, defaultSvgClass)
              "
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
            {{ $t('pages.user.settings.title') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '@nuxtjs/composition-api'

const route = useRoute()

const settingsActiveLinkClass =
  'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 bg-gray-50 text-indigo-600'
const settingsDefaultClass =
  'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600'

const activeLinkClass =
  'bg-gray-50 text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
const defaultLinkClass =
  'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'

const activeSvgClass = 'h-6 w-6 shrink-0 text-indigo-600'
const defaultSvgClass =
  'h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600'

function isActive(path: string, exact: boolean = false): boolean {
  return exact ? route.value.path === path : route.value.path.startsWith(path)
}

function getClass(
  path: string,
  activeClass: string,
  defaultClass: string,
  exact: boolean = false
): string {
  return isActive(path, exact) ? activeClass : defaultClass
}
</script>

<script lang="ts">
export default {
  name: 'CommonMenu'
}
</script>
