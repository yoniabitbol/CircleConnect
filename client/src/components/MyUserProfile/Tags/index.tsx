import { useState, useEffect } from "react";
import updateUserPreferenceTags from "../../../http/updateUserPreferenceTags";
import { useTranslation } from "react-i18next";
import {Button, Chip} from '@mui/material';

interface TagsProps {
  preferenceTags: string[];
}

const Tags: React.FC<TagsProps> = ({ preferenceTags }) => {
  const {t} = useTranslation();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag !== "") {
      updateUserPreferenceTags([...tags, newTag]);
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const deleteTag = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    updateUserPreferenceTags(updatedTags);
    setTags(updatedTags);
  };

  useEffect(() => {
    setTags(preferenceTags);
  }, [preferenceTags]);

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold">{t('userProfile.label.tags')}</h1>
      <div className="flex font-bold mt-3 space-x-2">
        {tags.map((tag: string) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => deleteTag(tag)}
            sx={{backgroundColor: '#4F46E5'}}
          />
        ))}
      </div>
        <div className="flex items-center">
            <input
                type="text"
                placeholder={t('userProfile.label.addTag') as string}
                onChange={handleChange}
                value={newTag}
                className="bg-white text-slate-500 py-2 px-4 rounded-xl m-2 w-fit dark:secondary-dark"
            />
            <Button
                variant="contained"
                disableElevation={true}
                onClick={addTag}
            >
                {t('userProfile.label.add')}
            </Button>
        </div>

    </div>
  );
};

export default Tags;
