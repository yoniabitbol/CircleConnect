import { useState, useEffect } from "react";
import updateUserPreferenceTags from "../../../http/updateUserPreferenceTags";

interface TagsProps {
  preferenceTags: string[];
}

const Tags: React.FC<TagsProps> = ({ preferenceTags }) => {
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
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold">Tags</h1>
      <div className="flex flex-wrap font-bold">
        {tags.map((tag: string) => (
          <div
            key={tag}
            className="flex bg-slate-500 text-white py-2 px-4 rounded-xl m-2 w-fit items-center"
          >
            <div className="">{tag}</div>
            <button
              className="ml-2 hover:bg-red-500 px-2 rounded-full"
              onClick={() => deleteTag(tag)} // Call deleteTag function with the current tag
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add a tag"
        onChange={handleChange}
        value={newTag}
        className="bg-white text-slate-500 py-2 px-4 rounded-xl m-2 w-fit"
      />
      <button
        type="button"
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
        onClick={addTag}
      >
        Add
      </button>
    </div>
  );
};

export default Tags;
