import { Router } from "express";
import { getProducts, postProduct } from "@/controllers/product-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createProductSchema } from "@/schemas/product-schema";

const productRouter = Router();

productRouter
  .post("/", authToken, validateBody(createProductSchema), postProduct)
  .get("/", getProducts);

export { productRouter };
