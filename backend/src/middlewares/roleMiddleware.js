export function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    /*
    |--------------------------------------------------------------------------
    | VALIDAR ROLE
    |--------------------------------------------------------------------------
    */

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Sem permissão",
      });
    }

    next();
  };
}
