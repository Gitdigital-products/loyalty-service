import fs from "fs";

export function initTracing() {
  try {
    const endpoint = fs.readFileSync("endpoints", "utf-8").trim();
    process.env.TRACING_ENDPOINT = endpoint;
    console.log(`Tracing initialized -> ${endpoint}`);
  } catch (err) {
    console.warn("Tracing not configured (no endpoints file found).");
  }
}
