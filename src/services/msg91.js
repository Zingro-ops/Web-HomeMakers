const WIDGET_ID = import.meta.env.VITE_MSG91_WIDGET_ID;
const TOKEN_AUTH = import.meta.env.VITE_MSG91_TOKEN;

let initPromise = null;

export function initializeMsg91() {
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve, reject) => {
    if (typeof window.initSendOTP !== "function") {
      reject(new Error("MSG91 SDK is not loaded."));
      return;
    }

    window.initSendOTP({
      widgetId: WIDGET_ID,
      tokenAuth: TOKEN_AUTH,
      exposeMethods: true,
      success: (data) => console.log("MSG91 Init Success:", data),
      failure: (error) => console.error("MSG91 Init Failure:", error),
    });

    // exposeMethods mode exposes window.sendOtp synchronously; small delay for safety
    setTimeout(resolve, 300);
  });

  return initPromise;
}

export async function sendOtp(phone) {
  await initializeMsg91();

  return new Promise((resolve, reject) => {
    if (typeof window.sendOtp !== "function") {
      reject(new Error("MSG91 sendOtp() not found."));
      return;
    }

    const identifier = `91${phone}`;

    window.sendOtp(
      identifier,
      (data) => {
        console.log("OTP Sent", data);
        resolve(data);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
    );
  });
}

export function verifyOtp(otp) {
  return new Promise((resolve, reject) => {
    if (typeof window.verifyOtp !== "function") {
      reject(new Error("MSG91 verifyOtp() not found."));
      return;
    }

    window.verifyOtp(
      otp,
      (data) => {
        console.log("OTP Verified", data);
        resolve(data);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
    );
  });
}

export function resendOtp(channel = null) {
  return new Promise((resolve, reject) => {
    if (typeof window.retryOtp !== "function") {
      reject(new Error("MSG91 retryOtp() not found."));
      return;
    }

    window.retryOtp(
      channel,
      (data) => {
        console.log("OTP Resent", data);
        resolve(data);
      },
      (error) => {
        console.error(error);
        reject(error);
      },
    );
  });
}
