import bcrypt from 'bcryptjs';
console.log("Bcrypt loaded");
import mongoose from 'mongoose';
console.log("Mongoose loaded");
import express from 'express';
console.log("Express loaded");
import { Server } from 'socket.io';
console.log("Socket.io loaded");
import './models/User.js';
console.log("User model loaded");
import './controllers/authController.js';
console.log("Auth controller loaded");
import './routes/authRoutes.js';
console.log("Auth routes loaded");
import './routes/surveyRoutes.js';

console.log("Survey routes loaded");
import './routes/bloodBankRoutes.js';
console.log("BloodBank routes loaded");


