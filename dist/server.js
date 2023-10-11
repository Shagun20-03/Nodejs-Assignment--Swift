"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
//import loadRoute from './routes/loadRoutes'; 
//const mongoURI = 'mongodb+srv://admin-shagun:Test123@cluster0.s3ny0yg.mongodb.net/node_assignment'; // Replace with your MongoDB URI
// Configure the MongoDB connection with Mongoose
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://admin-shagun:Test123@cluster0.s3ny0yg.mongodb.net/node_assignment';
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
//app.use('/', loadRoute); 
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/posts', postRoutes_1.default);
app.use('/comments', commentRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
