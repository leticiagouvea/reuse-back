import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.proposalsUncheckedCreateInput) => {
  return prisma.proposals.create({
    data,
  });
};

const read = async (userId: number) => {
  const proposals = await prisma.proposals.findMany({
    where: {
      toUser: userId,
    },
    select: {
      id: true,
      fromUser: true,
      fromProduct: true,
      toProduct: true,
      status: true,
    },
  });

  const mappedProposals = await Promise.all(proposals.map(async (proposal) => {
    const fromUser = await prisma.users.findUnique({
      where: { id: proposal.fromUser },
      select: { username: true },
    });
    const fromProduct = await prisma.products.findUnique({
      where: { id: proposal.fromProduct },
      select: { image: true },
    });
    const toProduct = await prisma.products.findUnique({
      where: { id: proposal.toProduct },
      select: { image: true },
    });

    return {
      ...proposal,
      fromUser: fromUser?.username,
      fromProduct: fromProduct?.image,
      toProduct: toProduct?.image,
    };
  }));

  return mappedProposals;
};

const proposalRepository = {
  create,
  read,
};

export default proposalRepository;
