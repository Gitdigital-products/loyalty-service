SELECT wallet_address, SUM(amount) as total_earned
FROM points_ledger
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY wallet_address
HAVING SUM(amount) > 50000; -- Adjusted threshold for your program
