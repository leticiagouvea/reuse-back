import { requestError } from "@/errors/request-error";
import productRepository from "@/repositories/product-repository";
import proposalRepository from "@/repositories/proposal-repository";
import userRepository from "@/repositories/user-repository";
import { proposals } from "@prisma/client";

export type CreateProposalParams = Omit<proposals, "id" | "status">;

const createProposal = async ({
  fromUser,
  toUser,
  fromProduct,
  toProduct,
}: CreateProposalParams): Promise<proposals> => {
  const userExists = await userRepository.findById(toUser);

  if (!userExists) throw requestError("UserNotFoundError");

  const fromProductExists = await productRepository.readById(fromProduct);
  const toProductExists = await productRepository.readById(toProduct);

  if (!fromProductExists || !toProductExists) throw requestError("ProductNotFoundError");

  const result = await proposalRepository.create({ fromUser, toUser, fromProduct, toProduct });

  return result;
};

const readProposals = async (userId: number) => {
  const result = await proposalRepository.read(userId);

  return result;
};

const proposalService = {
  createProposal,
  readProposals
};

export default proposalService;
