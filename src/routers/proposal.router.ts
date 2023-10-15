import { Router } from "express";
import { getProposals, postProposal } from "@/controllers/proposal-controller";
import { authToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { createProposalSchema } from "@/schemas/proposal-schema";

const proposalRouter = Router();

proposalRouter
  .post("/", authToken, validateBody(createProposalSchema), postProposal)
  .get("/", authToken, getProposals);

export { proposalRouter };
