const jwt = require("jsonwebtoken");

// Authorization : Bearer .....
//checking Authorization ...

const protect = (req, res, next) => {
  const headerToken = req.header("Authorization");
  const token = headerToken && headerToken.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: "Access token invalid" });
  }
};

module.exports = protect;
