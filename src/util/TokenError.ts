class TokenError extends Error {
  constructor() {
    super();
    this.message = "Invalid token.";
    this.name = "TokenError";
  }
}

export default TokenError;
