const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('Request Files:', req.files);
      
      const { title, description, owner } = req.body;
      const image = req.files['image'] ? req.files['image'][0].filename : null;
      //const documentation = req.files['documentation'] ? req.files['documentation'][0].filename : null;
  
      if (!title || !description || !owner) {
        throw new Error('Missing required fields: title, description, or owner');
      }
  
      const newProject = new Project({
        owner,
        title,
        description,
        image,
        // documentation,
        collaborators: [],
        uiComponents: []
      });
  
      await newProject.save();
      console.log('Project successfully created:', newProject);
      return res.status(201).json({ message: 'Project created successfully!', project: newProject });
    } catch (error) {
      console.error('Error creating project:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
  

exports.getUserProjects = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const projects = await Project.find({ owner: req.user.email });
    //console.log('Projects:', projects); // Log fetched projects
    return res.status(200).json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProjectUIComponents = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiComponents } = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { uiComponents: uiComponents },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.error('Error updating project UI components:', error);
    return res.status(500).json({ error: error.message });
  }
};



