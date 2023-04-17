/* eslint-disable */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common';
import commonFr from './locales/fr/common';
import jobAppliedEn from './locales/en/jobApplied';
import jobAppliedFr from './locales/fr/jobApplied';
import userProfileEn from './locales/en/userProfile';
import userProfileFr from './locales/fr/userProfile';
import jobPostedEn from './locales/en/jobPosted';
import jobPostedFr from './locales/fr/jobPosted';
import editProfileEn from './locales/en/editProfile';
import editProfileFr from './locales/fr/editProfile';
import loginAndRegistrationEn from './locales/en/loginAndRegistration';
import loginAndRegistrationFr from './locales/fr/loginAndRegistration';
import notificationsEn from './locales/en/notifications';
import notificationsFr from './locales/fr/notifications';
import filterFeedFr from './locales/fr/filterFeed';
import filterFeedEn from './locales/en/filterFeed';

const namespaceEnCommon = {
    ...commonEn,
    ...jobAppliedEn,
    ...userProfileEn,
    ...jobPostedEn,
    ...editProfileEn,
    ...loginAndRegistrationEn,
    ...notificationsEn,
    ...filterFeedEn,
};

const namespaceFrCommon = {
    ...commonFr,
    ...jobAppliedFr,
    ...userProfileFr,
    ...jobPostedFr,
    ...editProfileFr,
    ...loginAndRegistrationFr,
    ...notificationsFr,
    ...filterFeedFr,
};

i18n.use(initReactI18next)
.init({
    debug: false,
    resources: {
        en: {
            common: namespaceEnCommon
        },  
        fr: {
            common: namespaceFrCommon
        }
    },
    fallbackLng: 'en',
    fallbackNS: 'common',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
        nsMode:'fallback',
    },
})

export default i18n;