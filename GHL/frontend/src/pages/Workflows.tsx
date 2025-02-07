import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

interface Workflow {
  id: string;
  name: string;
  description?: string;
}

const Workflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');

  useEffect(() => {
    // Fetch workflows from API
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('/api/ghl/workflows');
        if (response.ok) {
          const data = await response.json();
          setWorkflows(data);
        }
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };

    fetchWorkflows();
  }, []);

  const handleCreateWorkflow = async () => {
    try {
      const response = await fetch('/api/ghl/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWorkflowName,
          description: newWorkflowDescription,
        }),
      });

      if (response.ok) {
        const newWorkflow = await response.json();
        setWorkflows([...workflows, newWorkflow]);
        setOpenCreateDialog(false);
        setNewWorkflowName('');
        setNewWorkflowDescription('');
      }
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    try {
      const response = await fetch(`/api/ghl/workflows/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWorkflows(workflows.filter(workflow => workflow.id !== id));
      }
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Workflows
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenCreateDialog(true)}
        sx={{ mb: 2 }}
      >
        Create New Workflow
      </Button>

      <List>
        {workflows.map((workflow) => (
          <ListItem 
            key={workflow.id}
            secondaryAction={
              <Button 
                color="error" 
                onClick={() => handleDeleteWorkflow(workflow.id)}
              >
                Delete
              </Button>
            }
          >
            <ListItemText 
              primary={workflow.name}
              secondary={workflow.description}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Workflow</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workflow Name"
            fullWidth
            value={newWorkflowName}
            onChange={(e) => setNewWorkflowName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newWorkflowDescription}
            onChange={(e) => setNewWorkflowDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateWorkflow} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Workflows; 