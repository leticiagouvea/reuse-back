import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.productsUncheckedCreateInput) => {
  return prisma.products.create({
    data,
  });
};

const productRepository = {
  create,
};

export default productRepository;

