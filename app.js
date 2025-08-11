import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import HeroSectionRoute from "./routes/HeroSectionRoute.js";
import ContentRoute from "./routes/ContentRoute.js";
import ContactAndAddress from "./routes/ContactAndAddress.js";
import Websiteroute from "./routes/WebsiteGetRoute.js";
import AuthRouter from "./routes/AuthRoute.js";

import CardsRoute from "./routes/CardRoute.js";

dotenv.config({ path: "./.env" });

import { specs } from "./utils/Swagger.js";

import swaggerUi from "swagger-ui-express";

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/uploads", express.static("uploads"));
app.use("/hero", HeroSectionRoute);
app.use("/content", ContentRoute);
app.use("/address", ContactAndAddress);
app.use("/cards", CardsRoute);

app.use("/api", Websiteroute);
app.use("/auth", AuthRouter);

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);
