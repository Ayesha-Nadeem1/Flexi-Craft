import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WithLayout_User from "../../shared/Layout";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/projects/all-projects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are using token-based authentication
            },
          }
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    console.log(projectId)
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate("/projects/create-project");
  };

  return (
    <div className="mx-auto p-4 mt-[90px] ml-[200px] text-neutral-900">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold mb-4">Your Projects</h2>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-purple-900"
          onClick={handleCreateProject}
        >
          + Create New Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded-lg p-4 shadow-md"
            onClick={() => handleProjectClick(project._id)}
          >
            <img
              src={`http://localhost:5000/uploads/${project.image}`}
              alt={project.title}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithLayout_User(Projects);
