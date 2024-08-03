

// config.ts
const config = {
    stripeKey: String(import.meta.env.VITE_STRIPE_KEY),
    stripeClientUrl: String(import.meta.env.VITE_CLIENT_URL),
    stripePort: String(import.meta.env.VITE_PORT),
    stripeBaseUrl: String(import.meta.env.VITE_BASE_URL),
    firebaseApikey: String(import.meta.env.VITE_FIREBASE_APIKEY),
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    firebaseDatabaseUrl: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGEING_SENDER_ID),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    firebaseMeasurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
    reCaptchkey: String(import.meta.env.VITE_RECAPTCHKEY),
    cloudinaryApiKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
    cloudinarySecretKey: String(import.meta.env.VITE_CLOUDINARY_SECRET_KEY),
    cloudinaryPresetKey: String(import.meta.env.VITE_CLOUDINARY_PRESET_KEY),
    cloudinaryCloudName: String(import.meta.env.VITE_CLOUDINARY_CLOUDNAME),
};

export default config;

