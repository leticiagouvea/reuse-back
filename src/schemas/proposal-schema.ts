import joi from "joi";

type CreateProposalParams = {
  toUserId: number;
  fromProductId: number;
  toProductId: number;
}
export const createProposalSchema = joi.object<CreateProposalParams>({
  toUserId: joi.number().required(),
  fromProductId: joi.number().required(),
  toProductId: joi.number().required(),
});
