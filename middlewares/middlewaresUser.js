export function isAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    return next();
  } else {
    res.redirect("/login");
  }
}

export function isAdmin(req, res, next) {
  if (req.session.rol === 1) {
    return next();
  } else {
    res.send("No tienes permisos para acceder a esta página.");
  }
}
