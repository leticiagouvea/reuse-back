import { CreateProductParams } from "@/service/product-service";
import joi from "joi";

export const createProductSchema = joi.object<CreateProductParams>({
  name: joi.string().min(2).max(50).required(),
  image: joi.required(),
  description: joi.string().required(),
});
