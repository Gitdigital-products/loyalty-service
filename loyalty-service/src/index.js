import express from "express";
import { registerRoutes } from "./routes.js";
import { initTracing } from "./tracing.js";

const app = express();
const PORT = process.env.PORT || 3000;

// init tracing
initTracing();

// middleware
app.use(express.json());

// routes
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`loyalty-service running on port ${PORT}`);
});
