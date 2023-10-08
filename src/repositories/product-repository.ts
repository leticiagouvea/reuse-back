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

const productRepository = {
  create,
  read,
};

export default productRepository;

