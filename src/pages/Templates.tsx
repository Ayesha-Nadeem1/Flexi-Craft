import React, { useEffect, useState, ChangeEvent } from 'react';
import { LayoutTemplateIcon,DeleteIcon,EditIcon } from 'lucide-react';
import { useEditor } from './editor-provider';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '../components/ui/command';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useSocket} from '../SocketContext'
import { useParams } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  content: string; // Include content here to handle update
}

const TemplateBucketTab = () => {
  const { state, dispatch } = useEditor();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [open, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const socket = useSocket();
  const { roomId } = useParams();
  

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        const fetchedTemplates = data.map((item: { _id: string; content: string; name: string }) => ({
          id: item._id,
          content: item.content,
          name: item.name
        }));
        setTemplates(fetchedTemplates);
      } else {
        throw new Error('Failed to fetch templates');
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

    useEffect(() => {
      const handleTemplate = ({selectedtemplate, apidata}: { selectedtemplate : any, apidata : any }) => {
        dispatch({
          type: 'LOAD_DATA_TEMPLATE',
          payload: { elements: selectedtemplate }
        });
        setSelectedTemplate({
          id: apidata._id,
          content: apidata.content,
          name: apidata.name
        });
      };
      socket.on('templateselected', handleTemplate);
      return () => {
        socket.off('templateselected', handleTemplate);
      };
    }, [socket, dispatch]);

  const handleOnSave = () => {
    setOpen(true);
  };

  const saveTemplate = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, name: templateName }),
      });
  
      // Log the response for debugging
      const data = await response.json(); 
      if (response.ok) {
        console.log('Saved template:', { content, name: templateName });
        window.alert('Template saved successfully.');
        setOpen(false); // Close the modal
        setTemplateName(''); // Reset template name
        fetchTemplates(); // Refresh the template list
      } else {
        console.error('Error response:', data);
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      window.alert('Failed to save template.');
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    setTemplateName('');
  };

  const handleClick = async (templateId: string) => {
    console.log(`Clicked on template with ID: ${templateId}`);
    try {
      const response = await fetch(`/api/templates/${templateId}`);
      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(data.content);
        dispatch({
          type: 'LOAD_DATA_TEMPLATE',
          payload: { elements: content }
        });
        setSelectedTemplate({
          id: data._id,
          content: data.content,
          name: data.name
        });

        setTimeout(() => {
          const updatedElements = JSON.stringify(state.editor.elements);
      
          socket.emit('templateselected', {
            roomId,
            selectedtemplate : content,
            apidata : data,
            updatedElements
        });
        }, 0);


      } else {
        throw new Error('Failed to fetch template');
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteClick = (templateId: string) => {
    setTemplateToDelete(templateId);
    setDeleteDialogOpen(true);
  };

  const deleteTemplate = async () => {
    if (templateToDelete) {
      try {
        const response = await fetch(`/api/templates/${templateToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Deleted template with ID:', templateToDelete);
          window.alert('Template deleted successfully.');
          setDeleteDialogOpen(false);
          setTemplateToDelete(null); // Reset the template ID
          fetchTemplates(); // Refresh the template list
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        window.alert('Failed to delete template.');
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTemplateToDelete(null); // Reset the template ID
  };

  const handleUpdateClick = (template: Template) => {
    setSelectedTemplate(template);
    setUpdateDialogOpen(true);
  };

  const updateTemplate = async () => {
    if (selectedTemplate) {
      const content = JSON.stringify(state.editor.elements);
      try {
        const response = await fetch(`/api/templates/${selectedTemplate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content, name: selectedTemplate.name }),
        });

        if (response.ok) {
          console.log('Updated template:', { content, name: selectedTemplate.name });
          window.alert('Template updated successfully.');
          setUpdateDialogOpen(false);
          setSelectedTemplate(null); // Reset the selected template
          fetchTemplates(); // Refresh the template list
        } else {
          throw new Error('Failed to update');
        }
      } catch (error) {
        window.alert('Failed to update template.');
      }
    }
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedTemplate(null); // Reset the selected template
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-blue-500">Templates</h1>
          <Button variant="contained" color="primary" onClick={handleOnSave}>
            Store
          </Button>
        </div>

        <Command className="bg-transparent">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for template"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <CommandList className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <CommandGroup heading="Stored Templates">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {templates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center col-span-full p-6 bg-gray-100 rounded-md shadow-sm">
                    <LayoutTemplateIcon size={120} className="text-gray-500 mb-4" />
                    <p className="text-gray-500">No templates saved.</p>
                  </div>
                ) : (
                  templates
                    .filter(template =>
                      template.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((template) => (
                      <div
                        key={template.id}
                        className="relative cursor-pointer p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        <span className="text-lg font-medium" onClick={() => handleClick(template.id)}>
                          {template.name}
                        </span>
                        <Button
                          onClick={() => handleUpdateClick(template)}
                          className="absolute top-2 right-6" 
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(template.id)}
                          className="absolute top-2 right-6" 
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ))
                )}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Modal for entering template name */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Template</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name for your template.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Template Name"
              type="text"
              fullWidth
              variant="outlined"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={saveTemplate} color="primary" disabled={!templateName}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation dialog for deleting a template */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Template</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button onClick={deleteTemplate} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for updating a template */}
        <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Template</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the name of your template.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Template Name"
              type="text"
              fullWidth
              variant="outlined"
              value={selectedTemplate?.name || ''}
              onChange={(e) => setSelectedTemplate({
                ...selectedTemplate!,
                name: e.target.value
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>
              Cancel
            </Button>
            <Button onClick={updateTemplate} color="primary" disabled={!selectedTemplate?.name}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TemplateBucketTab;
