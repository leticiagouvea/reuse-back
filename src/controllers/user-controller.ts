import userService, { CreateUserParams } from "@/service/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postUser = async (req: Request, res: Response) => {
  const { email, password, username, city, state, cellphone } = req.body as CreateUserParams;

  try {
    await userService.createUser({ email, password, username, city, state, cellphone });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.message === "DuplicatedEmailError" || error.message === "DuplicatedUsernameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
};
