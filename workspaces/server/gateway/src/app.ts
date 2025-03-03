const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { setupSwagger } = require("./swagger");
import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { services } from "./lib/microserviceList";
import { verifyToken, dontVerifyToken } from "./lib/verifyToken";

dotenv.config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dynamic routing for microservices
services.forEach((service) => {
  const path = `/api/${service.name}`;
  const target = `http://localhost:${service.port}/api/${service.name}`;
  app.use(
    path,
    service.isTokenRequired ? verifyToken : dontVerifyToken,
    createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
});

setupSwagger(app);

// Redirect to docs
app.get("/", (req: Request, res: Response) => {
  return res.redirect("/docs");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
