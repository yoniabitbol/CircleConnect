/* eslint-disable */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common';
import commonFr from './locales/fr/common';
import jobAppliedEn from './locales/en/jobApplied';
import jobAppliedFr from './locales/fr/jobApplied';
import userProfileEn from './locales/en/userProfile';
import userProfileFr from './locales/en/userProfile';
import jobPostedEn from './locales/en/jobPosted';
import jobPostedFr from './locales/fr/jobPosted';


const namespaceEnCommon = {
    ...commonEn,
    ...jobAppliedEn,
    ...userProfileEn,
    ...jobPostedEn,
};

const namespaceFrCommon = {
    ...commonFr,
    ...jobAppliedFr,
    ...userProfileFr,
    ...jobPostedFr,

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