/**
 * VAPID Configuration for Push Notifications
 * These keys are used to authenticate push notification requests
 */

export const VAPID_CONFIG = {
  // Public key for client-side subscription
  publicKey: 'BBjjoVX9FVeKlSy_iiXl5b2leCyyW46rzgGu_rJY-Y68kyWIekl19_o_yt9Gd2GOvFoib6INIuvajq4I7wtvq1Q',
  
  // Private key for server-side sending (keep secure!)
  privateKey: 'X6mzoezY-HPqDqLOdHp5lMzNsBt-RIa5zER17mXxGl4',
  
  // Subject for VAPID (your email)
  subject: 'mailto:mathewsteven1996@gmail.com'
};

// Environment variable fallbacks
export const getVapidPublicKey = (): string => {
  return process.env.REACT_APP_VAPID_PUBLIC_KEY || VAPID_CONFIG.publicKey;
};

export const getVapidPrivateKey = (): string => {
  return process.env.VAPID_PRIVATE_KEY || VAPID_CONFIG.privateKey;
};

export const getVapidSubject = (): string => {
  return process.env.VAPID_SUBJECT || VAPID_CONFIG.subject;
};
