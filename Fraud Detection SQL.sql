-- Identify potential Sybil clusters (Referrers with many inactive referees)
SELECT 
    referrer_wallet, 
    COUNT(new_wallet) as total_referrals,
    COUNT(CASE WHEN current_balance = 500 THEN 1 END) as inactive_referees -- 500 is the welcome bonus
FROM referral_log
LEFT JOIN users_loyalty ON referral_log.new_wallet = users_loyalty.wallet_address
GROUP BY referrer_wallet
HAVING COUNT(new_wallet) > 10 AND (COUNT(CASE WHEN current_balance = 500 THEN 1 END) / COUNT(new_wallet)::float) > 0.8;
