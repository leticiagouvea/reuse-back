import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import proposalService from "@/service/proposal-service";
import { Response } from "express";
import httpStatus from "http-status";

export const postProposal = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { toUserId, fromProductId, toProductId } = req.body;
    const { userId } = req;

    const result = await proposalService.createProposal({
      fromUser: userId,
      toUser: toUserId,
      fromProduct: fromProductId,
      toProduct: toProductId,
    });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.message === "UserNotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }

    if (error.message === "ProductNotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const getProposals = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req;

    const result = await proposalService.readProposals(+userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }  
};
