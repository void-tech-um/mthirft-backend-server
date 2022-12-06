import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./api";
import db from "./models";

// Load environment variables
dotenv.config();

// Set our port
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Enable CORS: Cross Origin Resource Sharing
// This essentially allows us to make requests from our frontend to our backend
app.use(cors());

// Tell our app to use JSON
// This allows us to send JSON data to our backend
app.use(express.json());

// Tell our app to use the router we created
app.use("/", router);

// Sync the db and start the server
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("failed to sync db: ", err);
  });
