import nodemailer from "nodemailer";

/*
|--------------------------------------------------------------------------
| CONFIGURAÇÃO EMAIL
|--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
|--------------------------------------------------------------------------
| ENVIAR CÓDIGO
|--------------------------------------------------------------------------
*/

export async function sendVerificationEmail(email, code) {
  transporter.sendMail({
    from: `"3DESIGN" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "Código de Verificação",

    html: `
      <div style="
        background: #000;
        padding: 40px;
        color: white;
        font-family: Arial;
      ">

        <h1 style="color:#00d9ff;">
          3DESIGN
        </h1>

        <h2>
          Verificação de Conta
        </h2>

        <p>
          Seu código de verificação:
        </p>

        <div style="
          margin-top: 20px;
          font-size: 40px;
          font-weight: bold;
          color: #00d9ff;
        ">
          ${code}
        </div>

      </div>
    `,
  });
}
