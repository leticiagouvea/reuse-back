import { Router } from "express";
import { postProposal } from "@/controllers/proposal-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createProposalSchema } from "@/schemas/proposal-schema";

const proposalRouter = Router();

proposalRouter
  .post("/", authToken, validateBody(createProposalSchema), postProposal);

export { proposalRouter };
