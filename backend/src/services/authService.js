import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateCode } from "../utils/generateCode.js";

/*
|--------------------------------------------------------------------------
| CADASTRO DE USUÁRIO
|--------------------------------------------------------------------------
*/

export async function registerUser(data) {
  const { email, password } = data;

  /*
  |--------------------------------------------------------------------------
  | VERIFICA SE EMAIL JÁ EXISTE
  |--------------------------------------------------------------------------
  */

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("Email já cadastrado");
  }

  /*
  |--------------------------------------------------------------------------
  | CRIPTOGRAFA SENHA
  |--------------------------------------------------------------------------
  */

  const hashedPassword = await bcrypt.hash(password, 10);

  /*
  |--------------------------------------------------------------------------
  | GERA CÓDIGO DE VERIFICAÇÃO
  |--------------------------------------------------------------------------
  */

  const verificationCode = generateCode();

  /*
  |--------------------------------------------------------------------------
  | CRIA USUÁRIO
  |--------------------------------------------------------------------------
  */

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      verificationCode,
    },
  });

  return {
    user,
    verificationCode,
  };
}
