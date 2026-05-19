import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| VALIDAR TOKEN
|--------------------------------------------------------------------------
*/

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Token não informado",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | TOKEN
    |--------------------------------------------------------------------------
    */

    const token = authHeader.split(" ")[1];

    /*
    |--------------------------------------------------------------------------
    | VALIDAR
    |--------------------------------------------------------------------------
    */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /*
    |--------------------------------------------------------------------------
    | SALVAR USER
    |--------------------------------------------------------------------------
    */

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}
