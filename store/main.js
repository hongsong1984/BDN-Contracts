'use strict'

const series = require('async/series')
const IPFS = require('ipfs')
const fs = require("fs")
const log = require('log-to-file')
const Web3 = require('web3')
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;

const node = new IPFS({ repo: 'BDNStore' })
let fileMultihash
var bufferData
var web3
var abi

var contractAddress = '0x602995D862717a8739abE74aAB88d0Da53bAEF18'
var address = '0xe35edf83efddf9e99ac4714a0bb2726ba8eb0509';
var key = 'e8e3513e56f2665565fb648d561d4890c7442d714a235565dec81a4a1aee68bb';

abi = JSON.parse('[ { "constant": true, "inputs": [ { "name": "_dataId", "type": "uint256" } ], "name": "getData", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "dataIndex", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_uuid", "type": "uint256" }, { "name": "_ueid", "type": "address" }, { "name": "_dataType", "type": "string" }, { "name": "_filePath", "type": "string" }, { "name": "_totalCount", "type": "uint256" }, { "name": "_createTime", "type": "uint256" } ], "name": "addDataToStore", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]')
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/Yg5fplHNbqvfvpD3vcBw"));

const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(6999281);

fs.readFile("data.txt", function (err, data) {
    if (err) throw err;
    bufferData = data
});

series([
  (cb) => node.on('ready', cb),
  (cb) => node.files.add({
    content: Buffer.from(bufferData)
  }, (err, filesAdded) => {
    if (err) {
        log(err, 'errors.log')
    }
    fileMultihash = filesAdded[0].hash
    log('Data saved, hash '+ fileMultihash, 'store.log')
    try {
        var txOptions = {
            nonce: web3.toHex(web3.eth.getTransactionCount(address)),
            gasLimit: web3.toHex(8000000),
            gasPrice: web3.toHex(20000000),
            to: contractAddress
        }
        var dataArr = [1,address,'mac',fileMultihash,17,Date.now()]
        var rawTx = txutils.functionTx(abi, 'addDataToStore', dataArr, txOptions);
        sendRaw(rawTx);
    } catch (err) {
        log(err, 'errors.log')
    }
    cb()
  })
])

function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
            log(err, 'errors.log')
        } else {
            log('Result '+ result, 'store.log')
        }
    });
}
