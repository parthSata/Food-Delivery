const stripeKey = String(import.meta.env.VITE_STRIPE_KEY)
const stripeClientUrl = String(import.meta.env.VITE_CLIENT_URL)
const stripePort = String(import.meta.env.VITE_PORT)
const stripeBaseUrl = String(import.meta.env.VITE_BASE_URL)


export default {
    stripeKey,
    stripeClientUrl,
    stripePort,
    stripeBaseUrl
}