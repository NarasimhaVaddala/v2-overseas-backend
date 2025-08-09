import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for managing Hero Section content",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        HeroSection: {
          type: "object",
          required: ["title", "subTitle", "image", "page"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated ID of the hero section",
              example: "65f123ab45cde67890123456",
            },
            title: {
              type: "string",
              example: "Welcome to Our Platform",
            },
            subTitle: {
              type: "string",
              example: "We build amazing experiences",
            },
            extraPoint: {
              type: "string",
              example: "Limited offer!",
            },
            image: {
              type: "string",
              format: "uri",
              example: "/uploads/hero-123.jpg",
            },
            page: {
              type: "string",
              example: "home",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Validation failed or resource not found",
            },
          },
        },
      },
    },
  },
  // 👇 Use absolute path or relative from where node runs (project root)
  apis: [path.join(__dirname, "../routes/HeroSectionRoute.js")], // ✅ Correct path
};

export const specs = swaggerJsdoc(options);
