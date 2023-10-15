import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.productsUncheckedCreateInput) => {
  return prisma.products.create({
    data,
  });
};

const read = async () => {
  return prisma.products.findMany({
    include: {
      users: {
        select: { username: true }
      }
    }
  });
};

const readById = async (productId: number) => {
  return prisma.products.findFirst({
    where: {
      id: productId,
    }
  });
};

const productRepository = {
  create,
  read,
  readById
};

export default productRepository;

