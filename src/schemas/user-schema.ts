import { CreateUserParams } from "@/service/user-service";
import joi from "joi";

export const createUserSchema = joi.object<CreateUserParams>({
  email: joi.string().email().required(),
  username: joi.string().min(2).max(20).required(),
  city: joi.string().required(),
  state: joi.string().min(2).max(2).required(),
  cellphone: joi.string().required(),
  password: joi.string().min(6).max(100).required(),
});
