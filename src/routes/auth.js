const express = require('express');
const router = express.Router();
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDjllwmoRPKSIIyONggv5YIPdY_-xIubNk",
    authDomain: "fir-api-bd537.firebaseapp.com",
    projectId: "fir-api-bd537",
    storageBucket: "fir-api-bd537.appspot.com",
    messagingSenderId: "996370117474",
    appId: "1:996370117474:web:c79433c5483c0486df723b",
    measurementId: "G-ZS9516J32M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        res.status(201).json({ uid: userCredential.user.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;