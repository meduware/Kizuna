import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import fs from "fs";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Template Service API",
      version: "0.0.1",
      description: "Template microservice example",
    },
  },
  apis: [] as string[],
};

function getRouteFiles() {
  const routesPath = path.join(__dirname, "routes");
  const files = fs.readdirSync(routesPath);
  return files
    .filter((file) => file.endsWith(".ts"))
    .map((file) => path.join(routesPath, file));
}
export function setupSwagger(app: Express) {
  const routeFiles = getRouteFiles();
  options.apis = routeFiles;

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  routeFiles.forEach((routeFile) => {
    const route = require(routeFile).default;
    app.use("/api", route);
  });

  app.get("/docs-json", (_req, res) => res.json(swaggerSpec));
}
