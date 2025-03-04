export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "0.0.1",
      description: "",
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
