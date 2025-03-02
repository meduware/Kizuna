const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { setupSwagger } = require("./swagger");
import { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

setupSwagger(app);

// Redirect to docs
app.get("/", (req: Request, res: Response) => {
  return res.redirect("/docs");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
