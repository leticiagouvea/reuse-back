import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import productService from "@/service/product-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, image, description } = req.body;
    const { userId } = req;

    const imageBuffer = Buffer.from(image.split(",")[1], "base64");

    const result = await productService.createProduct({ name, image: imageBuffer, description, userId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};