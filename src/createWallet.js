// importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definir a rede
// bitcon - rede principal - mainnet
// testnet - rede de testes - testnet
const network = bitcoin.networks.testnet

// derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//criando o mnemonic para seed (palavra chave)
let mnemonic =  bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz das carteiras HD
let root = bip32.fromSeed(seed, network)

// criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network
}).address

console.log("carteira gerada")
console.log("Endereço:", btcAddress)
console.log("chave privada:", node.toWIF())
console.log("Seed:", mnemonic)

