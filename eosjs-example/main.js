const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env' });

let privateKeys = ['5JFKuxaLvzXsm71ha2K7NiuJ3ijGuQsDdBcJRK7FCGNhawFtyjf'];
const rpc = new JsonRpc('http://127.0.0.1:8011', { fetch });
const signatureProvider = new JsSignatureProvider(privateKeys);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

async function main() {
    try {
        const result2 = await rpc.get_currency_balance('eosio.token', 'minzzang1234','EOS');
        console.log(result2);

        const result = await api.transact({
            actions: [{
              account: 'eosio.token',
              name: 'transfer',
              authorization: [{
                actor: 'minzzang1234',
                permission: 'active',
              }],
              data: {
                from: 'minzzang1234',
                to: 'jtbcjtbcjtbc',
                quantity: '1.0000 EOS',
                memo: 'hi',
              },
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
          const result3 = await rpc.get_currency_balance('eosio.token', 'minzzang1234','EOS');
            console.log(result3);
            
        }catch(error) {
            console.error(error);
        }
    }

main();