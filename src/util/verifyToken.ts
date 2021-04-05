import jwt from "jsonwebtoken";
import TokenError from "@util/TokenError";

function verifyToken(authorization?: string): Record<string, unknown> {
  try {
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new TokenError();
    }

    const token = authorization.substring(7);
    return jwt.verify(token, <string>process.env.SEED) as Record<
      string,
      unknown
    >;
  } catch (error) {
    throw new TokenError();
  }
}

export default verifyToken;
