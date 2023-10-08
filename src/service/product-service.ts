import productRepository from "@/repositories/product-repository";
import { products } from "@prisma/client";

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

export type CreateProductParams = Omit<products, "id">

const productService = {
  createProduct,
  readProducts
};

export default productService;
