export function registerRoutes(app) {
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "loyalty-service" });
  });

  // Loyalty endpoints
  app.post("/loyalty/add-points", (req, res) => {
    const { userId, points } = req.body;
    res.json({ message: `${points} points added to user ${userId}`, newBalance: 1200 });
  });

  app.get("/loyalty/:userId", (req, res) => {
    const { userId } = req.params;
    res.json({ userId, pointsBalance: 1200, tier: "Gold" });
  });

  app.post("/loyalty/redeem", (req, res) => {
    const { userId, points } = req.body;
    res.json({ message: `${points} points redeemed for user ${userId}`, newBalance: 1000 });
  });
}
