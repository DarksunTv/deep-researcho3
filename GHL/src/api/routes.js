// YOLO Mode - Quick API Routes Implementation
const express = require('express');
const router = express.Router();
const GHLClient = require('./GHLClient');

// Get all workflows
router.get('/workflows', async (req, res) => {
    try {
        const workflows = await GHLClient.getWorkflows();
        res.json(workflows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific workflow
router.get('/workflows/:id', async (req, res) => {
    try {
        const workflow = await GHLClient.getWorkflow(req.params.id);
        res.json(workflow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create workflow
router.post('/workflows', async (req, res) => {
    try {
        const workflow = await GHLClient.createWorkflow(req.body);
        res.status(201).json(workflow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update workflow
router.put('/workflows/:id', async (req, res) => {
    try {
        const workflow = await GHLClient.updateWorkflow(req.params.id, req.body);
        res.json(workflow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete workflow
router.delete('/workflows/:id', async (req, res) => {
    try {
        await GHLClient.deleteWorkflow(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 