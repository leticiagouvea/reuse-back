import { requestError } from "@/errors/request-error";
import userRepository from "@/repositories/user-repository";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";

export type CreateUserParams = Omit<users, "id"> 

export const createUser = async ({ email, password, username, city, state, cellphone }: CreateUserParams): Promise<users> => {
  const emailExists = await userRepository.findByEmail(email);

  if (emailExists) throw requestError("DuplicatedEmailError");

  const usernameExists = await userRepository.findByUsername(username);

  if (usernameExists) throw requestError("DuplicatedUsernameError");

  const hashPassword = bcrypt.hashSync(password, 10);

  return userRepository.create({
    email,
    password: hashPassword,
    username,
    city,
    state,
    cellphone,
  });
};

const userService = {
  createUser,
};

export default userService;
