import { requestError } from "@/errors/request-error";
import productRepository from "@/repositories/product-repository";
import { products } from "@prisma/client";

export type CreateProductParams = Omit<products, "id">

const createProduct = async ({ 
  name, 
  image,  
  description, 
  userId 
}: CreateProductParams): Promise<products> => {
  const result = await productRepository.create({ name, image, description, userId });

  return result;
};

const readProducts = async (): Promise<products[]> => {
  const result = await productRepository.read();

  return result;
};

const readProductById = async (productId: number): Promise<products> => {
  const result = await productRepository.readById(productId);

  if (!result) throw requestError("NotFoundError");

  return result;
};

const productService = {
  createProduct,
  readProducts,
  readProductById
};

export default productService;
