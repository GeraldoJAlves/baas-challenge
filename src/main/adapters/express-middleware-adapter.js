module.exports = (middleware) => {
  return async (req, res, next) => {
    const request = {
      accessToken: req.headers['x-access-token'],
      ...(req.headers || {})
    }
    const { statusCode, body } = await middleware.handle(request)
    if (statusCode === 200) {
      Object.assign(req, body)
      next()
    } else {
      res.status(statusCode).json({
        error: body.message
      })
    }
  }
}
