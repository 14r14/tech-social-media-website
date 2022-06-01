exports.getAuthToken = (req, res) => {
  const token = req.signedCookies.token;
  return res.json({ token: token });
};