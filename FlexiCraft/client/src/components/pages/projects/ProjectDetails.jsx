import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WithLayout_User from '../../shared/Layout';
import axios from 'axios';

const ProjectDetails = ({ onSave }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you are using token-based authentication
          }
        });
        setProject(response.data.project);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const handleSave = () => {
    onSave(project);
  };

  const handleEdit = () => {
    navigate(`/canvas/${project._id}`);
  };

  const handleAddCollaborator = () => {
    if (collaboratorEmail) {
      setProject(prevProject => ({
        ...prevProject,
        collaborators: [...prevProject.collaborators, collaboratorEmail]
      }));
      setCollaboratorEmail('');
    }
  };

  if (!project) {
    return <div>Loading...</div>; // Optionally show a loading state while the project is being fetched
  }

  const { uiComponents } = project;

  return (
    <div className="mx-auto p-4 mt-[100px] ml-[200px] text-neutral-900">
      <div className='flex flex-row justify-between'>
        <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
        <button 
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-purple-900" 
          onClick={handleEdit}>
          Edit Template
        </button>
      </div>
      <img src={`http://localhost:5000/uploads/${project.image}`} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <h4 className="text-xl font-semibold">UI Components Used:</h4>
        <ul className="list-disc ml-6">
          {uiComponents.header && <li>{`Header: ${uiComponents.header}`}</li>}
          {uiComponents.hero && <li>{`Hero Section: ${uiComponents.hero}`}</li>}
          {uiComponents.footer && <li>{`Footer: ${uiComponents.footer}`}</li>}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="text-xl font-semibold">Collaborators:</h4>
        <ul className="list-disc ml-6">
          {project.collaborators.map((collaborator, index) => (
            <li key={index}>{collaborator}</li>
          ))}
        </ul>
        <input
          type="email"
          value={collaboratorEmail}
          onChange={(e) => setCollaboratorEmail(e.target.value)}
          placeholder="Add collaborator's email"
          className="border rounded p-2 mt-2 w-full bg-neutral-100"
        />
        <button 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md" 
          onClick={handleAddCollaborator}>
          Add Collaborator
        </button>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md" 
        onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default WithLayout_User(ProjectDetails);
