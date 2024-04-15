import React, { useState } from "react";

const FitnessProgramForm = () => {
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [category, setCategory] = useState("Other");
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("program_name", programName);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("category", category);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

//     try {
//       const response = await fetch("/api/programs/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create program");
//       }

//       // Handle successful creation
//       setProgramName("");
//       setDescription("");
//       setDuration(0);
//       setCategory("Other");
//       setCoverImage(null);
//     } catch (error) {
//       console.error("Error creating program:", error);
//       // Handle errors
//     }
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none"
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
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PROGRAM_CATEGORIES.map((category) => (
              <option key={category[0]} value={category[0]}>
                {category[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="coverImage" className="font-bold mb-2">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Program
        </button>
      </form>
    </div>
  );
};

const PROGRAM_CATEGORIES = [
  ["Weight Loss", "Weight Loss"],
  ["Strength Training", "Strength Training"],
  ["Cardio", "Cardio"],
  ["Flexibility", "Flexibility"],
  ["Other", "Other"],
];

export default FitnessProgramForm;
