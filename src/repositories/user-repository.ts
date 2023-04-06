import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const findByEmail = async (email: string, select?: Prisma.usersSelect) => {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
};

const findByUsername = async (username: string, select?: Prisma.usersSelect) => {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      username,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
};

const create = async (data: Prisma.usersUncheckedCreateInput) => {
  return prisma.users.create({
    data,
  });
};

const userRepository = {
  findByEmail,
  findByUsername,
  create
};

export default userRepository;
