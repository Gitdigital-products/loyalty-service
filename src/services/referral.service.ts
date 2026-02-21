export class ReferralService {
  // Define bonus constants
  private static BASE_REFERRAL_BONUS = 1000; // Base points
  private static WELCOME_BONUS = 500;       // For the new user

  // Multipliers based on the Referrer's Tier
  private static TIER_MULTIPLIERS: Record<string, number> = {
    'BRONZE': 1.0,
    'SILVER': 1.2, // 1200 points
    'GOLD': 1.5,   // 1500 points
    'PLATINUM': 2.0 // 2000 points
  };

  /**
   * Calculates and distributes referral bonuses
   */
  public async processReferral(referrerWallet: string, newWallet: string) {
    // 1. Get Referrer's current tier (from our DB)
    const referrerAccount = await db.users_loyalty.findUnique({ 
      where: { wallet_address: referrerWallet } 
    });
    
    const tier = referrerAccount?.tier_name || 'BRONZE';
    const multiplier = ReferralService.TIER_MULTIPLIERS[tier];
    
    const referrerBonus = ReferralService.BASE_REFERRAL_BONUS * multiplier;

    // 2. Prepare the Batch Transaction (On-chain)
    console.log(`Processing Referral: ${referrerWallet} (Tier: ${tier}) invited ${newWallet}`);
    
    return {
      referrer_bonus: referrerBonus,
      referee_bonus: ReferralService.WELCOME_BONUS,
      summary: `Referrer received ${referrerBonus} pts (${multiplier}x multiplier). Referee received ${ReferralService.WELCOME_BONUS} pts.`
    };
  }
}
