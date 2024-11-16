import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WithLayout_User from "../../shared/Layout";
import { ProjectsContext } from "../../ProjectsContext";
import { UserContext } from "../../UserContext"; // Import UserContext

const CreateProject = () => {
  const { addProject } = useContext(ProjectsContext);
  const { user } = useContext(UserContext); // Get the current user from UserContext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [documentation, setDocumentation] = useState(null); // State for PDF file
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); 
  };

  const handleDocumentationChange = (e) => {
    const file = e.target.files[0];
    setDocumentation(file); 
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("owner", user.email); // Add the user's email to the form data
    if (image) {
      formData.append("image", image); // Append image file if present
    }
    if (documentation) {
      formData.append("documentation", documentation); // Append PDF file if present
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
    // console.log(JSON.stringify(formData))
    try {
      const response = await fetch('http://localhost:5000/api/projects/create', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newProject = await response.json();
        addProject(newProject.project); // Add the new project to the context
        navigate(`/projects`);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-auto p-4 mt-[100px] ml-[200px] text-neutral-900">
      <h2 className="text-3xl font-bold mb-4">Create New Project</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-neutral-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-neutral-100"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded bg-neutral-100"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700">Upload Documentation (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleDocumentationChange}
          className="w-full p-2 border rounded bg-neutral-100"
        />
      </div> */}
      <div className="flex justify-center items-center">
        <button
          className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-purple-800 to-black button-shine h-[50px]"
          onClick={handleCreate}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default WithLayout_User(CreateProject);
