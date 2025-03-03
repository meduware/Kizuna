import swaggerUi from "swagger-ui-express";
import axios from "axios";
import { Express, Request, Response } from "express";
import { services } from "./lib/microserviceList";

async function waitForService(
  url: string,
  retries: number = 5,
  delay: number = 2000,
): Promise<void> {
  let attempts = 0;
  while (attempts < retries) {
    try {
      await axios.get(url);
      return;
    } catch (error) {
      attempts++;
      console.log(
        `Attempt ${attempts} failed for ${url}. Retrying in ${delay / 1000} seconds...`,
      );
      if (attempts === retries) {
        throw new Error(
          `Service at ${url} is not ready after ${retries} retries`,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function fetchSwaggerDocs() {
  // Waiting for the services to be ready
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let paths: any = {};
  let tags: any[] = [];

  for (const service of services) {
    const url = `http://localhost:${service.port}/docs-json`;
    try {
      // Just in case the service is not ready yet
      await waitForService(url);
      const { data } = await axios.get(url);
      Object.assign(paths, data.paths);
      tags.push(...data.tags);
    } catch (error: unknown) {
      const err = error as Error;
      console.error(`Service ${service.name} is not ready yet!`, err.message);
    }
  }

  return {
    openapi: "3.0.0",
    info: {
      title: "Kizuna API Gateway",
      version: "0.0.1",
      description: "API Documentation for all microservices",
    },
    paths,
    tags,
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
  };
}

export async function setupSwagger(app: Express) {
  const swaggerDocument = await fetchSwaggerDocs();

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/docs-json", (req: Request, res: Response) => {
    res.json(swaggerDocument);
  });
}
