'use client'

import './globals.css'
//import type { Metadata } from 'next'
import { env } from '@/config/environment'
import { ArrowPathIcon, BoltIcon, HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { UseInkathonProvider } from '@poppyseed/lastic-sdk'
import { Montserrat, Syncopate, Unbounded } from 'next/font/google'
import Background from './Background'
import Navbar from './Navbar'

import "./App.css"



import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { configureChains, createClient, createConfig, WagmiProvider } from "wagmi"
import { moonbaseAlpha } from "wagmi/chains"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"

const navigation_app = [
  {
    name: 'My Cores',
    icon: <HomeIcon className="h-5 w-5" aria-hidden="true" />,
    href: '/my-cores',
    current: false,
  },
  {
    name: 'Coretime Sales',
    icon: <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />,
    href: '/bulkcore1',
    current: false,
  },
  {
    name: 'On Demand Cores',
    icon: <BoltIcon className="h-5 w-5" aria-hidden="true" />,
    href: '/instacore',
    current: false,
  },
  {
    name: 'Teleport Assets',
    icon: <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />,
    href: '/teleport',
    current: false,
  },
]

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-unbounded',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-unbounded',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat',
})



// export const metadata: Metadata = {
//   title: 'Lastic',
//   description: 'Blockspace marketplace for Polkadot.',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { chains, provider } = configureChains(
    [
      moonbaseAlpha
    ],
    [
      infuraProvider({ apiKey: "51282d8221e64ba0a0b0e9dd604ea35a" }),
      publicProvider(),
    ],
  );

  export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })

  const { connectors } = getDefaultWallets({
    appName: "True Price Auctions",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <html lang="en">
      <body className={`${syncopate.variable} ${montserrat.variable} ${unbounded.variable}`}>
        <Background>
          <UseInkathonProvider
            appName="lastic" // TODO
            connectOnInit={true}
            defaultChain={env.defaultChain}
            relayChain={env.relayChain}
          >
          <WagmiProvider config={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Navbar navigation={navigation_app}>
              <div className="py-10 font-montserrat">
                <main>{children}</main>
              </div>
            </Navbar>

            </RainbowKitProvider>
          </WagmiProvider>
          </UseInkathonProvider>
        </Background>
      </body>
    </html>
  )
}
