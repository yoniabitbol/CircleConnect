/* eslint-disable */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common';
import commonFr from './locales/fr/common';
import jobAppliedEn from './locales/en/jobApplied';
import jobAppliedFr from './locales/fr/jobApplied';

const namespaceEnCommon = {
    ...commonEn,
    ...jobAppliedEn,
};

const namespaceFrCommon = {
    ...commonFr,
    ...jobAppliedFr
};

i18n.use(initReactI18next).init({
    debug: false,
    resources: {
        en: {
            common: namespaceEnCommon
        },  
        fr: {
            common: namespaceFrCommon
        }
    },
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    fallbackLng: 'fr',
    fallbackNS: 'common',
})

export default i18n;