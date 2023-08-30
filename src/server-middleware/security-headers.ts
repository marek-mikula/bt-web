import { ServerMiddleware } from '@nuxt/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const middleware: ServerMiddleware = function (req, res, next) {
  // Deny iframe usage if
  // it's not the same origin
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')

  // Block mimetype sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // Disabled all web APIs except those
  // we could use
  res.setHeader(
    'Permissions-Policy',
    [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'battery=()',
      'camera=(self)',
      'cross-origin-isolated=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'execution-while-not-rendered=()',
      'execution-while-out-of-viewport=()',
      'fullscreen=()',
      'geolocation=()',
      'gyroscope=()',
      'keyboard-map=()',
      'magnetometer=()',
      'microphone=(self)',
      'midi=()',
      'navigation-override=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'web-share=()',
      'xr-spatial-tracking=()',
      'clipboard-read=(self)',
      'clipboard-write=(self)',
      'gamepad=()',
      'speaker-selection=()',
      'conversion-measurement=()',
      'focus-without-user-activation=()',
      'hid=()',
      'idle-detection=()',
      'interest-cohort=()',
      'serial=()',
      'sync-script=()',
      'trust-token-redemption=()',
      'unload=()',
      'window-placement=()',
      'vertical-scroll=()'
    ].join(', ')
  )

  // Send the origin, path, and querystring when performing a same-origin request.
  // For cross-origin requests send the origin (only) when the protocol security
  // level stays same (HTTPS -> HTTPS). Don't send the Referer header to less secure
  // destinations (HTTPS → HTTP).
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Block site rendering when it contains malicious code
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // Use strictly HTTPS to access the web
  //
  // note: if we have always called the web through
  // HTTPS (localhost), the header will be ignored
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )

  next()
}

export default middleware
