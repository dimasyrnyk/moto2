const jwt = require("jsonwebtoken");

module.exports = (roles) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "Немає авторизації" });
      }

      const { roles: userRoles } = jwt.verify(token, process.env.JWT_SECTRET);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас немає доступу" });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: "Немає авторизації" });
    }
  };
};
