import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import fs from "fs";
import path from "path";
import {
  dontVerifyToken,
  verifyToken,
} from "../../gateway/src/lib/verifyToken";
import { services } from "../../gateway/src/lib/microserviceList";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "template", // NOTE: This name is need to be same as the service name because token authorization.
      version: "0.0.1",
      description: "Template microservice example",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
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

function getService(name: string) {
  return services.find((service) => service.name === name);
}

export function setupSwagger(app: Express) {
  const routeFiles = getRouteFiles();
  options.apis = routeFiles;

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  routeFiles.forEach((routeFile) => {
    const route = require(routeFile).default;
    app.use(
      "/api",
      getService(options.definition.info.title)?.isTokenRequired
        ? verifyToken
        : dontVerifyToken,
      route,
    );
  });

  app.get("/docs-json", (_req, res) => res.json(swaggerSpec));
}
