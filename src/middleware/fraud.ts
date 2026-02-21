export const validateReferral = async (req: Request, res: Response, next: Function) => {
  const { referrer_wallet, new_wallet } = req.body;

  // 1. Prevent self-referral
  if (referrer_wallet === new_wallet) {
    return res.status(400).json({ error: "Self-referral is not permitted." });
  }

  // 2. Optional: Check if the new wallet is "aged" 
  // (e.g., must have at least 0.05 SOL to prove it's not a fresh bot wallet)
  
  next();
};
