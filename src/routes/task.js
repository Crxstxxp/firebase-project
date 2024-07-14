const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await db.collection('tasks').add({ title, description });
        res.status(201).json({ id: newTask.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await db.collection('tasks').doc(id).update({ title, description });
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('tasks').doc(id).delete();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
