const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.password) {
    next()
  } else {
    next(new Error('not logged in!'))
  }
}

module.exports = isAuthenticated
