import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { programId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.get(`/project/approved/all?programId=${programId}`);
      setProjects(response.data);
    };
    fetchProjects();
  }, [programId]);

  const handleViewActivities = (projectId) => {
    navigate(`/admin/projects/${projectId}/activities`);
  };

  const handleCreateProject = () => {
    navigate(`/admin/programs/${programId}/projects/new`);
  };

  return (
    <div>
      <h1>Projects</h1>
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.title}
            <button onClick={() => handleViewActivities(project._id)}>
              View Activities
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
