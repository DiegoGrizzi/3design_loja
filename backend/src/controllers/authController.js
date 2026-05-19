import prisma from "../lib/prisma.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { sendVerificationEmail } from "../services/emailService.js";

/*
|--------------------------------------------------------------------------
| CADASTRO
|--------------------------------------------------------------------------
*/

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    /*
    |--------------------------------------------------------------------------
    | VALIDAÇÕES
    |--------------------------------------------------------------------------
    */

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Preencha todos os campos",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFICAR EMAIL EXISTENTE
    |--------------------------------------------------------------------------
    */

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: "Email já cadastrado",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CRIPTOGRAFAR SENHA
    |--------------------------------------------------------------------------
    */

    const hashedPassword = await bcrypt.hash(password, 10);

    /*
    |--------------------------------------------------------------------------
    | GERAR CÓDIGO
    |--------------------------------------------------------------------------
    */

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    /*
    |--------------------------------------------------------------------------
    | CRIAR USUÁRIO
    |--------------------------------------------------------------------------
    */

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        verificationCode,

        emailVerified: false,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | ENVIAR EMAIL
    |--------------------------------------------------------------------------
    */

    sendVerificationEmail(user.email, verificationCode);

    /*
    |--------------------------------------------------------------------------
    | SUCESSO
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      message: "Código enviado para seu email",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

/*
|--------------------------------------------------------------------------
| VERIFICAR EMAIL
|--------------------------------------------------------------------------
*/

export async function verifyEmail(req, res) {
  try {
    const { email, code } = req.body;

    /*
    |--------------------------------------------------------------------------
    | BUSCAR USUÁRIO
    |--------------------------------------------------------------------------
    */

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | USUÁRIO NÃO ENCONTRADO
    |--------------------------------------------------------------------------
    */

    if (!user) {
      return res.status(400).json({
        error: "Usuário não encontrado",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDAR CÓDIGO
    |--------------------------------------------------------------------------
    */

    if (user.verificationCode !== code) {
      return res.status(400).json({
        error: "Código inválido",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | ATUALIZAR USUÁRIO
    |--------------------------------------------------------------------------
    */

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        emailVerified: true,

        verificationCode: null,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | SUCESSO
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      message: "Email verificado com sucesso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    /*
    |--------------------------------------------------------------------------
    | VALIDAÇÕES
    |--------------------------------------------------------------------------
    */

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR USUÁRIO
    |--------------------------------------------------------------------------
    */

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
    |--------------------------------------------------------------------------
    | USUÁRIO NÃO ENCONTRADO
    |--------------------------------------------------------------------------
    */

    if (!user) {
      return res.status(400).json({
        error: "Email ou senha inválidos",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | EMAIL NÃO VERIFICADO
    |--------------------------------------------------------------------------
    */

    if (!user.emailVerified) {
      return res.status(400).json({
        error: "Verifique seu email antes de entrar",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDAR SENHA
    |--------------------------------------------------------------------------
    */

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Email ou senha inválidos",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | GERAR TOKEN JWT
    |--------------------------------------------------------------------------
    */

    const token = jwt.sign(
      {
        id: user.id,

        email: user.email,

        role: user.role,
      },

      process.env.JWT_SECRET || "3design_super_secret_jwt",

      {
        expiresIn: "7d",
      },
    );
    /*
    |--------------------------------------------------------------------------
    | SUCESSO
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      message: "Login realizado com sucesso",

      token,

      user: {
        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
