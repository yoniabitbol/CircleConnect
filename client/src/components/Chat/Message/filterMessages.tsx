import Filter from "badwords-filter";
import badwordsArray from "badwords";
import { useTranslation } from "react-i18next";

interface FilterMessageProps {
    text: string;
}
const FilterMessage: React.FC<FilterMessageProps> = ({ text }) => {
    const filter = new Filter({ list: badwordsArray });
    const { t } = useTranslation();
    return (
        <>
            <span>{filter.clean(text)}</span>
            {filter.isUnclean(text) && (
                <div className="text-red-600">
                    <span>{t('chat.label.noProfanity')}</span>
                </div>
            )}
        </>
    );
};

export default FilterMessage;