import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import { getService } from "./services/handler";

dotenv.config();

const app = express();
const PORT = getService()!.port;

app.use(express.json());

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`${getService()!.name} service running on port ${PORT}`);
});
