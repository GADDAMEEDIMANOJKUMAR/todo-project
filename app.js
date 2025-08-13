// app.js
const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose to connect to MongoDB
const cors = require("cors"); // Import CORS for frontend-backend connection
const dotenv = require("dotenv"); // To load environment variables from .env file
const todoRoutes = require("./routes/todoRoutes"); // Import routes for todos

dotenv.config(); // Load .env variables

const app = express(); // Create an Express app

// app.use(cors({
// origin: 'https://todo-frontend-1-caww.onrender.com/', // replace with your Vercel domain
// methods: ['GET', 'POST', 'PUT', 'DELETE'],
// credentials: true
// })); // Allow cross-origin requests (frontend-backend)

const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-frontend-1-caww.onrender.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON requests

app.use("/", todoRoutes); // Use all routes in todoRoutes under this base path

const PORT = process.env.PORT || 5000; // Choose port from .env or default to 5000

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("❌ MongoDB connection error:", error));
