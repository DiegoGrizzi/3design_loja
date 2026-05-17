import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| ROTAS
|--------------------------------------------------------------------------
*/

app.use("/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| ROTA TESTE
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  return res.json({
    message: "API funcionando!",
  });
});

/*
|--------------------------------------------------------------------------
| PORTA
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
