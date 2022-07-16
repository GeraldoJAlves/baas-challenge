module.exports = (controller) => {
  return async (req, res) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }
    const { statusCode, body } = await controller.handle(request)
    if (statusCode < 200 || statusCode > 299) {
      return res.status(statusCode).json({ error: body.message })
    }
    res.status(statusCode).json(body)
  }
}
