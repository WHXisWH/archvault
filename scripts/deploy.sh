#!/bin/bash

# Exit on error
set -e

# 1. Build the Next.js application
echo "Building Next.js application..."
npm run build

# 2. Deploy smart contracts
# This assumes you have a Hardhat project configured.
# You would need to create a scripts/deploy.js for Hardhat.
echo "Deploying smart contracts..."
# npx hardhat run scripts/deploy.js --network calibnet

echo "Deployment script finished."
