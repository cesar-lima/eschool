import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import AppError from "./errors/AppError";

import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
