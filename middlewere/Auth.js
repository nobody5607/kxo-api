const seecret_key = "hiSFn5OhduD$PvJ5%%j$&!2hPosAqrd&Z%Ac%nJKtv0Pttp2@#";
import jwt from "jsonwebtoken";
export const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { data } = jwt.verify(token, seecret_key);
    req.user = data;
    next();
  } catch {
    res.json({ status: "nok", message: "Unauthorized" });
  }
};
