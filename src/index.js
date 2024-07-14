const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
const serviceAccount = require('./config/serviceAccountKey.json');
const morgan = require('morgan');