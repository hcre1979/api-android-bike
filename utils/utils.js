module.exports = {

  isAuthenticated: function (req, res, next) {
    if (!req.session.user) {
      return res.status(401).send();
    }

    next();
  }

};
