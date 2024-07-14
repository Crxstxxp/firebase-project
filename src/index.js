const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
const serviceAccount = require('./config/serviceAccountKey.json');
const morgan = require('morgan');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



const firebaseConfig = {
    apiKey: "AIzaSyDjllwmoRPKSIIyONggv5YIPdY_-xIubNk",
    authDomain: "fir-api-bd537.firebaseapp.com",
    projectId: "fir-api-bd537",
    storageBucket: "fir-api-bd537.appspot.com",
    messagingSenderId: "996370117474",
    appId: "1:996370117474:web:c79433c5483c0486df723b",
    measurementId: "G-ZS9516J32M"
};

firebase.initializeApp(firebaseConfig);

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});