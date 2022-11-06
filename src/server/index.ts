import express from "express";
import router from "./api";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Load environment variables
dotenv.config();

// Set our port
const PORT = process.env.SERVER_PORT;

// Create Express server
const app = express();

// Enable CORS: Cross Origin Resource Sharing
// This essentially allows us to make requests from our frontend to our backend
app.use(cors());

// Tell our app to use JSON
// This allows us to send JSON data to our backend
app.use(express.json());

// Tell our app to use the router we created
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}/api`);
});
