import React from "react";

const wallet = () => {
  const wallets = [
    { name: "SafePal", link: "safepal.com", image: "/images/safepal.jpg" },
    {
      name: "Wallet Connect",
      link: "wallettconnect.com",
      image: "/images/wallet_connect.jpg",
    },
    {
      name: "Trust Wallet",
      link: "trustwallet.com",
      image: "/images/trust_wallet.jpg",
    },
    { name: "Metamask", link: "metamask.io", image: "/images/metamask.jpg" },
    {
      name: "Liquality",
      link: "liquality.com",
      image: "/images/liquality.jpg",
    },
    {
      name: "Phantom Wallet",
      link: "phantom.com",
      image: "/images/phantom_wallet.jpg",
    },
    {
      name: "Polygon Wallet",
      link: "polygon.technology",
      image: "/images/polygon_wallet.jpg",
    },
    { name: "Rainbow", link: "rainbow.me", image: "/images/rainbow.jpg" },
    { name: "Bitpay", link: "bitpay.com", image: "/images/bitpay.jpg" },
    { name: "Walleth", link: "walleth.org", image: "/images/walleth.jpg" },
    { name: "Argent", link: "argent.xyz", image: "/images/argent.jpg" },
    {
      name: "Huobi Wallet",
      link: "huobiwallet.com",
      image: "/images/huobi_wallet.jpg",
    },
    {
      name: "Encrypted Ink",
      link: "encrypted.ink",
      image: "/images/encrypted_ink.jpg",
    },
    {
      name: "Compound",
      link: "compound.finance",
      image: "/images/compound.jpg",
    },
    {
      name: "Polkadot",
      link: "polkadot.network",
      image: "/images/polkadot.jpg",
    },
    { name: "Iotex", link: "iotex.io", image: "/images/iotex.jpg" },
    { name: "Coin98", link: "coin98.com", image: "/images/coin98.jpg" },
    {
      name: "Coinbase",
      link: "coinbase.com",
      image: "/images/coinbase.jpg",
    },
    {
      name: "Crypto.com | Defi Wallet",
      link: "crypto.com",
      image: "/images/crypto_defi_wallet.jpg",
    },
    {
      name: "Token Pocket",
      link: "tokenpocket.pro",
      image: "/images/token_pocket.jpg",
    },
    {
      name: "Math Wallet",
      link: "mathwallet.org",
      image: "/images/math_wallet.jpg",
    },
    {
      name: "Ledger Live",
      link: "ledger.com",
      image: "/images/ledger_live.jpg",
    },
    { name: "1Inch", link: "1inch.io", image: "/images/1inch.jpg" },
    { name: "Dharma", link: "dharma.io", image: "/images/dharma.jpg" },
    {
      name: "Trust Vault",
      link: "trustology.io",
      image: "/images/trust_vault.jpg",
    },
    { name: "MYKEY", link: "mykey.org", image: "/images/mykey.jpg" },
    { name: "Atomic", link: "atomicwallet.io", image: "/images/atomic.jpg" },
    {
      name: "CoolWallet S",
      link: "coolwallet.io",
      image: "/images/coolwallet_s.jpg",
    },
    { name: "Nash", link: "nash.io", image: "/images/nash.jpg" },
    { name: "Coinomi", link: "coinomi.com", image: "/images/coinomi.jpg" },
    { name: "Eternl", link: "eternl.com", image: "/images/eternl.jpg" },
    { name: "GridPlus", link: "gridplus.io", image: "/images/gridplus.jpg" },
    { name: "Tokenary", link: "tokenary.io", image: "/images/tokenary.jpg" },
    {
      name: "Infinito",
      link: "infinitowallet.io",
      image: "/images/infinito.jpg",
    },
    { name: "Wallet.io", link: "wallet.io", image: "/images/wallet_io.jpg" },
    { name: "Ownbit", link: "ownbit.io", image: "/images/ownbit.jpg" },
    {
      name: "EasyPocket",
      link: "easypocket.app",
      image: "/images/easypocket.jpg",
    },
    {
      name: "Bridge Wallet",
      link: "mtpelerin.com",
      image: "/images/bridge_wallet.jpg",
    },
    {
      name: "ViaWallet",
      link: "viawallet.com",
      image: "/images/viawallet.jpg",
    },
    { name: "BitKeep", link: "bitkeep.com", image: "/images/bitkeep.jpg" },
    {
      name: "Unstoppable Wallet",
      link: "unstoppable.money",
      image: "/images/unstoppable_wallet.jpg",
    },
    {
      name: "HaloDefi Wallet",
      link: "halodefi.org",
      image: "/images/halodefi_wallet.jpg",
    },
    {
      name: "Dok Wallet",
      link: "dokwallet.com",
      image: "/images/dok_wallet.jpg",
    },
    {
      name: "Cello Wallet",
      link: "cellowallet.app",
      image: "/images/cello_wallet.jpg",
    },
    { name: "CoinUs", link: "coinus.io", image: "/images/coinus.jpg" },
    { name: "Valora", link: "valoraapp.com", image: "/images/valora.jpg" },
    {
      name: "Trustee Wallet",
      link: "trusteeglobal.com",
      image: "/images/trustee_wallet.jpg",
    },
    {
      name: "Gaurda Wallet",
      link: "guarda.com",
      image: "/images/gaurda_wallet.jpg",
    },
    {
      name: "Jade Wallet",
      link: "jadewallet.io",
      image: "/images/jade_wallet.jpg",
    },
    {
      name: "PlasmaPay",
      link: "plasmapay.com",
      image: "/images/plasmapay.jpg",
    },
    { name: "O3Wallet", link: "o3.network", image: "/images/o3wallet.jpg" },
    {
      name: "HashKey Me",
      link: "me.hashkey.com",
      image: "/images/hashkey_me.jpg",
    },
    { name: "RWallet", link: "rsk.co", image: "/images/rwallet.jpg" },
    {
      name: "Flare Wallet",
      link: "flarewallet.io",
      image: "/images/flare_wallet.jpg",
    },
    {
      name: "KyberSwap",
      link: "kyberswap.com",
      image: "/images/kyberswap.jpg",
    },
    {
      name: "AToken Wallet",
      link: "atoken.com",
      image: "/images/atoken_wallet.jpg",
    },
    {
      name: "Tongue Wallet",
      link: "tongue.fi",
      image: "/images/tongue_wallet.jpg",
    },
    {
      name: "XinFin XDC Network",
      link: "xinfin.io",
      image: "/images/xinfin_xdc_network.jpg",
    },
    {
      name: "Talken Wallet",
      link: "talken.io",
      image: "/images/talken_wallet.jpg",
    },
    {
      name: "KEYRING PRO",
      link: "keyring.app",
      image: "/images/keyring_pro.jpg",
    },
    {
      name: "Midas Wallet",
      link: "midasprotocol.io",
      image: "/images/midas_wallet.jpg",
    },
    {
      name: "AT.Wallet",
      link: "authentrend.com",
      image: "/images/at_wallet.jpg",
    },
    { name: "imToken", link: "token.im", image: "/images/imtoken.jpg" },
    { name: "Solflare", link: "", image: "/images/solflare.jpg" },
    { name: "Nova", link: "", image: "/images/nova.jpg" },
    { name: "Braavos", link: "", image: "/images/braavos.jpg" },
    { name: "Brave", link: "", image: "/images/brave.jpg" },
    { name: "Xverse", link: "", image: "/images/xverse.jpg" },
    { name: "Leather", link: "", image: "/images/leather.jpg" },
    { name: "Keplr", link: "", image: "/images/keplr.jpg" },
    { name: "Thor", link: "", image: "/images/thor.jpg" },
    { name: "Rabby", link: "", image: "/images/rabby.jpg" },
    {
      name: "Backpack Wallet",
      link: "Backpack",
      image: "/images/backpack_wallet.jpg",
    },
    { name: "Sui Wallet", link: "Sui", image: "/images/sui_wallet.jpg" },
    { name: "OKX Wallet", link: "OKX", image: "/images/okx_wallet.jpg" },
    { name: "Glow Wallet", link: "Glow", image: "/images/glow_wallet.jpg" },
    {
      name: "Blockchain Wallet",
      link: "Blockchain",
      image: "/images/blockchain_wallet.jpg",
    },
    { name: "Nami", link: "", image: "/images/nami.jpg" },
    { name: "Trezor", link: "", image: "/images/trezor.jpg" },
    { name: "Pera", link: "", image: "/images/pera.jpg" },
    { name: "Leap", link: "", image: "/images/leap.jpg" },
    { name: "Sei", link: "", image: "/images/sei.jpg" },
    { name: "Stacks", link: "", image: "/images/stacks.jpg" },
    {
      name: "Internet identity",
      link: "",
      image: "/images/internet_identity.jpg",
    },
    { name: "Others", link: "", image: "/images/others.jpg" },
  ];
  return (
    <div>
      <div>
        <div
          className="flex items-center justify-between p-6 w-full"
          style={{
            background: `linear-gradient(90deg, #f76002, #e85b04c4, #e85b0491, #e85b0456)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default wallet;
