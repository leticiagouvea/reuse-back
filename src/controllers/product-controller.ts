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

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await productService.readProducts();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }  
};

export const getProductById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.readProductById(Number(productId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
