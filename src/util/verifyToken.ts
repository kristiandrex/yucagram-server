import jwt from "jsonwebtoken";
import TokenError from "@util/TokenError";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function verifyToken(authorization?: string) {
  try {
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new TokenError();
    }

    const token = authorization.substring(7);
    return jwt.verify(token, <string>process.env.SEED);
  } catch (error) {
    throw new TokenError();
  }
}

export default verifyToken;
