import rateLimit from 'express-rate-limit';

// Strict limit for sensitive operations (Issue/Redeem)
export const loyaltyActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 redemption/issue attempts
  message: { error: "Too many transactions attempted. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// General limit for balance checks
export const generalApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 1 request per second average
});
