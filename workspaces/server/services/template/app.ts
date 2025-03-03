import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
const PORT = process.env.TEMPLATE_SERVICE_PORT || 3002;

app.use(express.json());

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Template service running on port ${PORT}`);
});
