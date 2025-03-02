const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const healthRouter = require("./routes/health");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kizuna API",
      version: "1.0.0",
      description: "Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: any): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", healthRouter);
};
