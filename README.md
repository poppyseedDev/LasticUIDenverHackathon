# Lastic Integration with Polkadot and Moonbeam

![FIGMA UI](https://github.com/LasticXYZ/LasticUI/assets/30662672/442e1f73-8bd9-48a2-8139-1057ec2dddd1)

## Overview

Lastic is at the forefront of integrating cutting-edge blockchain technologies, specifically within the Polkadot ecosystem. The shift from traditional auction-based core leasing to a dynamic buy-and-sell model presents unique opportunities and challenges. Lastic leverages this by offering a platform to trade core time effectively, utilizing the capabilities of Moonbeam and Moonriver as EVM-compatible chains for deploying smart contracts.

This project is a proof of concept developed during a hackathon aimed at exploiting the scarcity and value of cores in the blockchain space. We have developed an English auction-style smart contract to facilitate the trading of core time, integrating innovative features such as NFT masking to enhance privacy and security.

## Features

- **Dual UI Compatibility**: Supports both Ethereum-style and Polkadot-style wallet addresses, offering a seamless experience for users of both blockchain ecosystems.
- **Smart Contract Development**: Utilizes Foundry for robust smart contract development and deployment on Moonbase Alpha, with front-end interaction facilitated by Wagmi.
- **Cross-Chain Interaction**: Employs the `lastic-sdk` and `xcm-sdk` for efficient cross-chain messaging and transactions, maintaining core integrity on the Coretime chain while executing transactions on Moonbeam (_Yet to be implemented_).

## How It Works

1. **Core Acquisition**: Users purchase core time during designated periods.
2. **Auction Creation**: Sellers can divide their core time into multiple segments and list them for auction on Lastic.
3. **Transaction Execution**: Through interactions with the Lastic smart contracts on Moonbeam or Moonriver, users can auction their core time. An XCM call is triggered to transfer the core, ensuring it remains within the Coretime chain while transaction fees are executed on Moonbeam.

## Getting Started

To start using the Lastic platform for your core trading needs, follow these simple steps:

1. Install dependencies:
   ```shell
   pnpm install
   ```

2. Set up the environment:
   ```shell
   cp .env.local.example .env.local
   ```

3. Start the development server:
   ```shell
   pnpm run dev
   ```

## Limitations and Opportunities

While the move to a buy-and-sell model for cores opens new avenues for trading and utilization, it also introduces challenges, particularly in smart contract deployment and interaction within the Coretime chain. Our solution, leveraging Moonbeam and Moonriver, provides a viable workaround, facilitating seamless interactions and transactions while maintaining the integrity and security of core assets.

