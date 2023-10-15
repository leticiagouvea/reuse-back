import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.proposalsUncheckedCreateInput) => {
  return prisma.proposals.create({
    data,
  });
};

const proposalRepository = {
  create
};

export default proposalRepository;
