import { Request, Response } from 'express';
import { LoyaltyService } from '../services/loyalty.service';

export class LoyaltyController {
  private loyaltyService: LoyaltyService;

  constructor() {
    this.loyaltyService = new LoyaltyService();
  }

  // GET /v1/accounts/:wallet
  public getAccount = async (req: Request, res: Response) => {
    try {
      const { wallet } = req.params;
      const accountData = await this.loyaltyService.getAccountDetails(wallet);
      return res.status(200).json(accountData);
    } catch (error) {
      return res.status(404).json({ error: "Account not found" });
    }
  };

  // POST /v1/transactions/issue
  public issuePoints = async (req: Request, res: Response) => {
    const { wallet_address, amount, reason, metadata } = req.body;
    
    // Basic validation
    if (!wallet_address || amount <= 0) {
      return res.status(400).json({ error: "Invalid wallet or amount" });
    }

    const result = await this.loyaltyService.addPoints(wallet_address, amount, reason, metadata);
    return res.status(201).json(result);
  };
}
