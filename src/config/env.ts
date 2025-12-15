// App
export const ENVIRONMENT = process.env.ENVIRONMENT ?? "development";

export const APP_ID = process.env.APP_ID;

export const PORT = Number(process.env.PORT) || 7777;

// Passport
export const PASSPORT_URL = String(process.env.PASSPORT_URL);
export const PASSPORT_PERSONAL_CLIENT_ID = Number(
  process.env.PASSPORT_PERSONAL_CLIENT_ID
);
export const PASSPORT_PERSONAL_CLIENT_SECRET = String(
  process.env.PASSPORT_PERSONAL_CLIENT_SECRET
);
export const PASSPORT_APPLICATION_CLIENT_ID = String(
  process.env.PASSPORT_APPLICATION_CLIENT_ID
);
export const PASSPORT_APPLICATION_CLIENT_SECRET = String(
  process.env.PASSPORT_APPLICATION_CLIENT_SECRET
);
export const RESET_PASSWORD_EMAIL_URL = String(
  process.env.RESET_PASSWORD_EMAIL_URL
);

// Database - Gesture Detection Service
export const GESTURE_SERVICE_HOST = String(
  process.env.GESTURE_SERVICE_HOST
);
export const GESTURE_SERVICE_USERNAME = String(
  process.env.GESTURE_SERVICE_USERNAME
);
export const GESTURE_SERVICE_PASSWORD = String(
  process.env.GESTURE_SERVICE_PASSWORD
);
export const GESTURE_SERVICE_DATABASE = String(
  process.env.GESTURE_SERVICE_DATABASE
);
export const GESTURE_SERVICE_PORT = Number(
  process.env.GESTURE_SERVICE_PORT
);
export const GESTURE_SERVICE_DEBUG =
  String(process.env.GESTURE_SERVICE_DEBUG) === "true";

export const DATABASE_MAX_INT_SIZE = Number(process.env.DATABASE_MAX_INT_SIZE);
export const EXPIRED_PERIOD_TEST = Number(process.env.EXPIRED_PERIOD_TEST);

//SSO
export const SSO_URL = String(process.env.SSO_URL);
