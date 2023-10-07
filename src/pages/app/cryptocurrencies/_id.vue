<template>
  <div>
    <div
      v-if="cryptocurrency === null"
      class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
    >
      <CommonSpinner :type="'primary'" :size="10" />
    </div>

    <div v-else>
      <header class="relative isolate">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"
          >
            <div class="flex items-center gap-x-6">
              <img
                :src="cryptocurrency.currency.meta.logo"
                :alt="cryptocurrency.currency.name + ' logo'"
                class="h-16 w-16 flex-none rounded-full"
              />
              <h1>
                <span class="font-semibold text-gray-900">
                  {{ cryptocurrency.currency.name }}
                </span>
                <span class="ml-1 text-gray-300">
                  {{ cryptocurrency.currency.symbol.toUpperCase() }}
                </span>
              </h1>
            </div>
            <div class="flex items-center gap-x-4 sm:gap-x-6">
              <button
                type="button"
                class="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
              >
                Copy URL
              </button>
              <a
                href="#"
                class="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
                >Edit</a
              >
              <a
                href="#"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Send</a
              >

              <div class="relative sm:hidden">
                <button
                  id="more-menu-button"
                  type="button"
                  class="-m-3 block p-3"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">More</span>
                  <svg
                    class="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                    />
                  </svg>
                </button>

                <!--
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                <div
                  class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="more-menu-button"
                  tabindex="-1"
                >
                  <!-- Active: "bg-gray-50", Not Active: "" -->
                  <button
                    id="more-menu-item-0"
                    type="button"
                    class="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                  >
                    Copy URL
                  </button>
                  <a
                    id="more-menu-item-1"
                    href="#"
                    class="block px-3 py-1 text-sm leading-6 text-gray-900"
                    role="menuitem"
                    tabindex="-1"
                    >Edit</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <!-- cryptocurrency side panel -->
          <div class="lg:sticky lg:top-20 lg:col-start-3 lg:row-end-1">
            <div
              class="rounded bg-white shadow-sm ring-1 ring-gray-200 md:rounded-lg"
            >
              <dl class="flex flex-wrap">
                <div class="flex-auto pl-6 pt-6">
                  <dt class="text-sm font-semibold leading-6 text-gray-900">
                    Price
                  </dt>
                  <dd
                    class="mt-1 text-base font-semibold leading-6 text-gray-900"
                  >
                    $10,560.00
                  </dd>
                </div>
                <div class="flex-none self-end px-6 pt-4">
                  <dt class="sr-only">Status</dt>
                  <dd
                    class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20"
                  >
                    Paid
                  </dd>
                </div>
                <div
                  class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-200 px-6 pt-6"
                >
                  <dt class="flex-none">
                    <span class="sr-only">Client</span>
                    <svg
                      class="h-6 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </dt>
                  <dd class="text-sm font-medium leading-6 text-gray-900">
                    Alex Curren
                  </dd>
                </div>
                <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt class="flex-none">
                    <span class="sr-only">Due date</span>
                    <svg
                      class="h-6 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </dt>
                  <dd class="text-sm leading-6 text-gray-500">
                    <time datetime="2023-01-31">January 31, 2023</time>
                  </dd>
                </div>
                <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt class="flex-none">
                    <span class="sr-only">Status</span>
                    <svg
                      class="h-6 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </dt>
                  <dd class="text-sm leading-6 text-gray-500">
                    Paid with MasterCard
                  </dd>
                </div>
              </dl>
              <div class="mt-6 border-t border-gray-200 px-6 py-6">
                <a
                  href="#"
                  class="text-sm font-semibold leading-6 text-gray-900"
                  >Download receipt <span aria-hidden="true">&rarr;</span></a
                >
              </div>
            </div>
          </div>

          <div class="space-y-8 lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <!-- general information -->
            <div
              class="overflow-hidden rounded bg-white shadow-sm shadow ring-1 ring-gray-200 sm:rounded-lg md:rounded-lg"
            >
              <div class="px-4 py-6 sm:px-6">
                <h2
                  class="mb-4 flex items-center text-base font-semibold leading-7 text-gray-900"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-2 h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <span>
                    {{ $t('pages.cryptocurrency.detail.info.title') }}
                  </span>
                </h2>

                <p class="max-w-2xl text-sm leading-6 text-gray-500">
                  {{ cryptocurrency.currency.meta.description ?? '' }}
                </p>
              </div>

              <div class="border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                  <div
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      {{ $t('pages.cryptocurrency.detail.info.cmc') }}
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    >
                      <CommonLink
                        :value="`https://coinmarketcap.com/currencies/${cryptocurrency.currency.meta.slug}/`"
                        copy
                        link
                        outer
                      />
                    </dd>
                  </div>

                  <div
                    v-if="cryptocurrency.currency.meta.urls.website"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      {{ $t('pages.cryptocurrency.detail.info.web') }}
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    >
                      <CommonLink
                        :value="cryptocurrency.currency.meta.urls.website"
                        copy
                        link
                        outer
                      />
                    </dd>
                  </div>

                  <div
                    v-if="cryptocurrency.currency.meta.urls.source_code"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      {{ $t('pages.cryptocurrency.detail.info.sourceCode') }}
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    >
                      <CommonLink
                        :value="cryptocurrency.currency.meta.urls.source_code"
                        copy
                        link
                        outer
                      />
                    </dd>
                  </div>

                  <div
                    v-if="cryptocurrency.currency.meta.urls.twitter"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      {{ $t('pages.cryptocurrency.detail.info.twitter') }}
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    >
                      <CommonLink
                        :value="cryptocurrency.currency.meta.urls.twitter"
                        copy
                        link
                        outer
                      />
                    </dd>
                  </div>

                  <div
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      {{ $t('pages.cryptocurrency.detail.info.tradingPairs') }}
                    </dt>
                    <dd
                      class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                    >
                      <ul
                        role="list"
                        class="divide-y divide-gray-100 rounded-md border border-gray-200"
                      >
                        <li
                          v-for="currency in cryptocurrency.currency.quotes"
                          :key="currency.id"
                          class="flex items-center justify-between space-x-2 py-2 px-3 text-sm leading-6"
                        >
                          <span
                            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                          >
                            {{ currency.pivot.symbol }}
                          </span>
                          <span class="flex items-center space-x-1">
                            <span>
                              {{ cryptocurrency.currency.symbol }}
                            </span>
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                            <span>
                              <RouterLink
                                :to="`/app/cryptocurrencies/${currency.id}`"
                                class="hover:text-indigo-600 hover:underline"
                              >
                                {{ currency.symbol }}
                              </RouterLink>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- whale alerts -->
            <div
              class="overflow-hidden rounded bg-white shadow-sm shadow ring-1 ring-gray-200 sm:rounded-lg md:rounded-lg"
            >
              <div class="px-4 py-6 sm:px-6">
                <h2
                  class="mb-4 flex items-center text-base font-semibold leading-7 text-gray-900"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-2 h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  <span>
                    {{ $t('pages.cryptocurrency.detail.whaleAlerts.title') }}
                  </span>
                </h2>

                <div>
                  <CommonAlert
                    v-if="cryptocurrency.whaleAlerts === null"
                    :type="'info'"
                    :message="
                      $t(
                        'pages.cryptocurrency.detail.whaleAlerts.notSupported'
                      ).toString()
                    "
                  />

                  <CommonAlert
                    v-else-if="cryptocurrency.whaleAlerts.length < 1"
                    :type="'info'"
                    :message="
                      $t(
                        'pages.cryptocurrency.detail.whaleAlerts.empty'
                      ).toString()
                    "
                  />

                  <ul
                    v-else
                    role="list"
                    class="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li
                      v-for="whaleAlert in cryptocurrency.whaleAlerts"
                      :key="whaleAlert.id"
                      class="flex items-center justify-between py-2 px-3 text-sm leading-6"
                    >
                      <div class="flex flex-col space-y-1">
                        <div class="flex items-baseline gap-x-1">
                          <span class="truncate font-medium">
                            {{ formatCurrency(whaleAlert.amountUsd, 'USD') }}
                          </span>
                          <span class="text-xs text-gray-400">
                            {{
                              formatCryptocurrency(
                                whaleAlert.amount,
                                whaleAlert.currency.symbol
                              )
                            }}
                          </span>
                        </div>

                        <div class="flex items-center text-sm">
                          <span>
                            {{ whaleAlert.senderName ?? $t('common.unknown') }}
                          </span>

                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="mx-2 h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>

                          <span>
                            {{
                              whaleAlert.receiverName ?? $t('common.unknown')
                            }}
                          </span>
                        </div>

                        <div class="text-xs text-gray-400">
                          {{ whaleAlert.notifiedAt }}
                        </div>
                      </div>

                      <CommonLink
                        :value="whaleAlert.hash"
                        :value-link="
                          getWhaleAlertTransactionHasHref(whaleAlert)
                        "
                        copy
                        link
                        outer
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- news -->
            <div
              class="overflow-hidden rounded bg-white shadow-sm shadow ring-1 ring-gray-200 sm:rounded-lg md:rounded-lg"
            >
              <div class="px-4 py-6 sm:px-6">
                <h2
                  class="mb-4 flex items-center text-base font-semibold leading-7 text-gray-900"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-2 h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                    />
                  </svg>
                  <span>
                    {{ $t('pages.cryptocurrency.detail.news.title') }}
                  </span>
                </h2>

                <div>
                  <CommonAlert
                    v-if="cryptocurrency.news.length < 1"
                    :type="'info'"
                    :message="
                      $t('pages.cryptocurrency.detail.news.empty').toString()
                    "
                  />

                  <ul
                    v-else
                    role="list"
                    class="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li
                      v-for="news in cryptocurrency.news"
                      :key="news.id"
                      class="group relative flex items-center py-2 px-3"
                    >
                      <div class="flex flex-grow flex-col space-y-1">
                        <a :href="news.url" target="_blank">
                          <span class="absolute inset-0"></span>
                        </a>

                        <div
                          class="text-sm leading-6 group-hover:text-indigo-600 group-hover:underline"
                        >
                          <span class="font-semibold"
                            >{{ news.sourceName }}:</span
                          >
                          <span class="italic">{{ news.title }}</span>
                        </div>

                        <div class="text-xs text-gray-400">
                          {{ news.publishedAt }}
                        </div>
                      </div>

                      <span
                        class="invisible ml-2 hidden animate-zigzag text-indigo-600 group-hover:visible md:inline"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </li>

                    <li class="group relative py-2 px-3">
                      <a
                        :href="`https://cryptopanic.com/news/${cryptocurrency.currency.symbol}`"
                        target="_blank"
                      >
                        <span class="absolute inset-0"></span>
                      </a>

                      <div
                        class="text-center text-sm group-hover:text-indigo-600 group-hover:underline"
                      >
                        {{ $t('pages.cryptocurrency.detail.news.showMore') }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useAsync,
  useContext,
  useRoute,
  watch
} from '@nuxtjs/composition-api'
import { CryptocurrencyDetail } from '~/types/http/Entities'
import { CryptocurrencyShowResponse } from '~/types/http/Responses'
import { getWhaleAlertTransactionHasHref } from '~/helpers'
import { useFormat } from '~/composables/format'

const { formatCurrency, formatCryptocurrency } = useFormat()
const { $repositories } = useContext()
const route = useRoute()

const cryptocurrency = ref<null | CryptocurrencyDetail>(null)
const id = parseInt(route.value.params.id)

const data = useAsync<CryptocurrencyShowResponse>(async () => {
  return await $repositories.cryptocurrency
    .show(id)
    .then((response) => response.data)
}, `cryptocurrency-${id}`)

watch(
  () => data.value,
  function (val: CryptocurrencyShowResponse | null): void {
    cryptocurrency.value = val?.data?.cryptocurrency || null
  },
  {
    immediate: true
  }
)
</script>

<script lang="ts">
export default {
  name: 'AppCryptocurrenciesDetailPage',
  layout: 'app'
}
</script>
