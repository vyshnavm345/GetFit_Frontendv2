import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProgramme } from "features/trainer";

const FitnessProgramForm = ({ setAddProgramme, addProgramme }) => {

  const { trainer, created } = useSelector((state) => state.trainer);

  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Other");
  const [level, setLevel] = useState("Beginner");
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch()

  
  const handleClick = () => {
    
    setAddProgramme(!addProgramme);
  };
  
  // if(created){handleClick()};
  useEffect(() => {
    if (created) {
      handleClick();
    }
  }, [created]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("program_name", programName);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("trainer", trainer?.id);

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }
    dispatch(createProgramme(formData));
   
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  return (
    <div className="container text-white mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold text-center">
          Create New Fitness Program
        </h2>
        <div className="flex flex-col">
          <label htmlFor="programName" className="font-bold mb-2">
            Program Name
          </label>
          <input
            type="text"
            id="programName"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duration" className="font-bold mb-2">
            Duration (days)
          </label>
          <input
            type="number"
            id="duration"
            min="1"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duration" className="font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            min="1"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PROGRAM_CATEGORIES.map((category) => (
              <option key={category[0]} value={category[0]}>
                {category[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="level" className="font-bold mb-2">
            Difficulty Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {LEVEL_CHOICES.map((level) => (
              <option key={level[0]} value={level[0]}>
                {level[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="coverImage" className="font-bold  mb-2">
            Cover Image
          </label>
          {coverImage instanceof File && (
            <img
              className="h-20 w-20 object-cover"
              src={URL.createObjectURL(coverImage)}
              alt="img"
            />
          )}
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleClick}
            type="button"
            className="bg-red-500 w-80 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 w-80 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Program
          </button>
        </div>
      </form>
    </div>
  );
};

const PROGRAM_CATEGORIES = [
  ["Weight Loss", "Weight Loss"],
  ["Strength Training", "Strength Training"],
  ["Cardio", "Cardio"],
  ["Yoga", "Yoga"],
  ["Pilates", "Pilates"],
  ["HIIT", "HIIT"],
  ["CrossFit", "CrossFit"],
  ["Other", "Other"],
];
const LEVEL_CHOICES = [
  ["Beginner", "Beginner"],
  ["Intermediate", "Intermediate"],
  ["Advance", "Advance"],
];



export default FitnessProgramForm;
