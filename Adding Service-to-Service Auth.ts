// src/middleware/auth.ts
export const internalAuth = (req: Request, res: Response, next: Function) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_SERVICE_KEY) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};
