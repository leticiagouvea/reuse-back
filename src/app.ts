import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import { authRouter, userRouter, productRouter, proposalRouter } from "@/routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json({ limit: "10mb" }))
  .get("/status", (_req, res) => res.send("OK!"))
  .use("/sign-up", userRouter)
  .use("/sign-in", authRouter)
  .use("/products", productRouter)
  .use("/proposals", proposalRouter);

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDB();
};

export default app;
