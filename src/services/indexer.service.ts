import { Connection, PublicKey } from '@solana/web3.js';

export class IndexerService {
  private connection = new Connection("https://api.mainnet-beta.solana.com");

  public async startListening(programId: string) {
    console.log(`Listening for loyalty events on ${programId}...`);

    this.connection.onLogs(new PublicKey(programId), (logs) => {
      if (logs.err) return;
      
      // 1. Parse logs for 'PointsIssued' event
      // 2. Extract wallet address and amount
      // 3. Update PostgreSQL: 
      //    UPDATE users_loyalty SET current_balance = current_balance + amount...
      
      console.log("On-chain event detected. Syncing database...");
    }, "confirmed");
  }
}
