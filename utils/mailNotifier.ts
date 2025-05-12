import MailNotifierSDK from "mail-notifier-sdk";
const MAIL_NOTIFIER_URL = process.env.MAIL_NOTIFIER_URL || "";
const MAIL_NOTIFIER_KEY = process.env.MAIL_NOTIFIER_KEY || "";
const URL = `/api/proxy?url=${MAIL_NOTIFIER_URL}`;
export const mailNotifier = new MailNotifierSDK(URL, MAIL_NOTIFIER_KEY);
export const serverMailNotifier = new MailNotifierSDK(
  MAIL_NOTIFIER_URL,
  MAIL_NOTIFIER_KEY,
);
