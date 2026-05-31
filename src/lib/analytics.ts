'use client'

type GtagCommand = 'config' | 'event' | 'js'
type GtagParams = Record<string, string | number | boolean | Date | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: GtagCommand, targetId: string | Date, params?: GtagParams) => void
  }
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const contactConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL

function getGtag() {
  if (typeof window === 'undefined') return null
  return typeof window.gtag === 'function' ? window.gtag : null
}

export function trackEvent(eventName: string, params: GtagParams = {}) {
  const gtag = getGtag()

  if (!gtag || !gaMeasurementId) return

  gtag('event', eventName, {
    ...params,
    send_to: gaMeasurementId,
  })
}

export function trackGoogleAdsContactConversion() {
  const gtag = getGtag()

  if (!gtag || !googleAdsId || !contactConversionLabel) return

  gtag('event', 'conversion', {
    send_to: `${googleAdsId}/${contactConversionLabel}`,
  })
}

export function trackContactSubmit(status: 'success' | 'error') {
  trackEvent(status === 'success' ? 'contact_form_submit_success' : 'contact_form_submit_error')

  if (status === 'success') {
    trackGoogleAdsContactConversion()
  }
}

export function trackPhoneClick(location = 'site') {
  trackEvent('phone_click', { location })
}

export function trackEmailClick(location = 'site') {
  trackEvent('email_click', { location })
}

export function trackNavigationClick(label: string, location: 'header' | 'footer') {
  trackEvent(location === 'header' ? 'header_anchor_click' : 'footer_link_click', {
    label,
  })
}
