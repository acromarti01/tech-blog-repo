const withAuth = (req, res, next) => {
  if (req.session.logged_in) { next(); } 
  else { res.redirect("/user/login"); }
};

module.exports = withAuth;
