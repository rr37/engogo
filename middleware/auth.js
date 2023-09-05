module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        return res.redirect('/admin/journals')
      } else if (req.user.role === 'user') {
        return next()
      }
    }
    req.flash('warning_messages', '請先登入後才能使用。')
    res.redirect('/signin')
  },
  authentedAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next()
    } else {
      res.redirect('/admin/signin')
    }
  },
}
