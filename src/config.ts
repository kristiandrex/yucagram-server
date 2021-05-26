//prettier-ignore
export const clientUrl = process.env.NODE_ENV === "production"
  ? "https://yucagram.vercel.app"
  : "http://localhost:3000";

//prettier-ignore
export const MONGO_URI = process.env.NODE_ENV === "production"
  ? process.env.MONGO_URI
  : process.env.TEST_MONGO_URI;

export const port = process.env.PORT || 5000;
