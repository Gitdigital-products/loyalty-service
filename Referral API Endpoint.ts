// POST /v1/referrals/claim
public claimReferral = async (req: Request, res: Response) => {
  const { referrer_wallet, new_wallet } = req.body;

  try {
    const result = await this.referralService.processReferral(referrer_wallet, new_wallet);
    
    // Trigger the On-Chain Minting for both parties
    await this.loyaltyService.addPoints(referrer_wallet, result.referrer_bonus, "referral_bonus");
    await this.loyaltyService.addPoints(new_wallet, result.referee_bonus, "welcome_bonus");

    return res.status(200).json({
      message: "Referral bonuses issued successfully",
      details: result
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process referral" });
  }
};
