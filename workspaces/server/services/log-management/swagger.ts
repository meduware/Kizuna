import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import {
  dontVerifyToken,
  verifyToken,
} from "../../gateway/src/lib/verifyToken";
import { getRouteFiles, getService, getServiceName } from "./services/handler";
import { options } from "../../gateway/src/lib/serviceOption";

export function setupSwagger(app: Express) {
  const routeFiles = getRouteFiles();
  options.apis = routeFiles;
  options.definition.info.title = getServiceName();
  options.definition.info.description = `${getServiceName()} microservice example`;

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  routeFiles.forEach((routeFile) => {
    const route = require(routeFile).default;
    app.use(
      "/api",
      getService()?.isTokenRequired ? verifyToken : dontVerifyToken,
      route
    );
  });

  app.get("/docs-json", (_req, res) => res.json(swaggerSpec));
}
