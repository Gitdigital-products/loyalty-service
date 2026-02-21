import { LoyaltyService } from '../src/services/loyalty.service';
import * as fs from 'fs';

async function migrateUsers(csvPath: string) {
  const loyaltyService = new LoyaltyService();
  const users = parseCsv(csvPath); // Load your legacy data

  for (const user of users) {
    console.log(`Migrating ${user.id}: ${user.balance} pts`);
    
    try {
      // 1. Initial Mint on Solana
      const tx = await loyaltyService.addPoints(user.wallet, user.balance, "legacy_migration");
      
      // 2. Log success for audit
      fs.appendFileSync('migration_log.txt', `${user.id},${user.wallet},${tx.on_chain_tx}\n`);
    } catch (e) {
      console.error(`Failed to migrate ${user.id}:`, e);
    }
  }
}
