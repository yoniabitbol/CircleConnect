import Filter from "badwords-filter";
import badwordsArray from "badwords";

interface FilterMessageProps {
    text: string;
}
const FilterMessage: React.FC<FilterMessageProps> = ({ text }) => {
    const filter = new Filter({ list: badwordsArray });
    return (
        <>
            <span>{filter.clean(text)}</span>
            {filter.isUnclean(text) && (
                <div className="text-red-600">
                    <span>Please refrain from using bad language</span>
                </div>
            )}
        </>
    );
};

export default FilterMessage;
