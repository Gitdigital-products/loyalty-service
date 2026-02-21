# Final Documentation (README.md)
## 🎖️ GitDigital Loyalty Service

[![Build Status](https://img.shields.io/github/actions/workflow/status/Gitdigital-products/loyalty-service/ci.yml?branch=main&style=for-the-badge)](https://github.com/Gitdigital-products/loyalty-service/actions)
[![License](https://img.shields.io/github/license/Gitdigital-products/loyalty-service?style=for-the-badge)](LICENSE)
[![Solana Compatibility](https://img.shields.io/badge/Solana-Mainnet--Beta-blueviolet?style=for-the-badge&logo=solana)](https://solana.com)
[![Coverage](https://img.shields.io/codecov/c/github/Gitdigital-products/loyalty-service?style=for-the-badge)](https://codecov.io)
[![Version](https://img.shields.io/github/v/release/Gitdigital-products/loyalty-service?style=for-the-badge)](https://github.com/Gitdigital-products/loyalty-service/releases)

A high-performance microservice for managing on-chain loyalty points, tier calculations, and reward redemptions.

---

## 🚀 Quick Start

### 1. Prerequisites
* **Docker** & **Docker Compose**
* **Node.js v20+**
* **Solana CLI** (for local smart contract testing)

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env

3. Spin up the Stack
This starts the Node.js API, PostgreSQL database, and the Redis cache.
docker-compose up -d

🏗️ Architecture
The service operates on a Dual-State model:
 * On-Chain (Source of Truth): All point minting and burns occur via the loyalty-program Anchor contract on Solana.
 * Off-Chain (Read Cache): A PostgreSQL database indexes on-chain events for sub-second latency on balance and tier lookups.
API Endpoints
| Endpoint | Description | Auth |
|---|---|---|
| GET /v1/accounts/:wallet | Get balance & tier info | Public |
| POST /v1/transactions/issue | Mint points to a user | Internal API Key |
| POST /v1/transactions/redeem | Burn points for rewards | User Signature |
🧪 Testing
Run the full suite (Unit + On-chain Integration):
# Test API & Logic
npm test

# Test Smart Contract
anchor test

🛠️ Tech Stack
 * Runtime: Node.js (TypeScript)
 * Blockchain: Solana (Anchor / Rust)
 * Database: PostgreSQL (Prisma ORM)
 * Caching: Redis
<!-- end list -->

---


