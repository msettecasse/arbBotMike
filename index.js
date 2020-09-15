var Web3 = require('web3');
const BigNumber = require('bignumber.js');

const oneSplitABI = require('./abis/onesplit.json');
const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net

const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETHEREUM
const fromTokenDecimals = 18;

const toToken = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI Token
const toTokenDecimals = 18;

const amountToExchange = 1

const web3 = new Web3('https://mainnet.infura.io/v3/50af193bf8db4eee96929441015d00c6');

const onesplitContract = new web3.eth.Contract(oneSplitABI, onesplitAddress);

const oneSplitDexes = [
    "Uniswap",
    "Kyber",
    "Bancor",
    "Oasis",
    "Curve Compound",
    "Curve USDT",
    "Curve Y",
    "Curve Binance",
    "Curve Synthetix",
    "Uniswap Compound",
    "Uniswap CHAI",
    "Uniswap Aave",
    "Mooniswap",
    "Uniswap V2",
    "Uniswap V2 ETH",
    "Uniswap V2 DAI",
    "Uniswap V2 USDC",
    "Curve Pax",
    "Curve renBTC",
    "Curve tBTC",
    "Dforce XSwap",
    "Shell",
    "mStable mUSD"
];




function callEthToDai() {
    onesplitContract.methods.getExpectedReturn(fromToken, toToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({
        from: ''
    }, function (error, result) {
        if (error) {
            console.log(error)
            return;
        }

        console.table([{
            'Input Token': 'Eth',
            'Output Token': 'Dai',
            "Trade Amount: ": amountToExchange,
            'Amount Returned': new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString()
          }])

    
    });
}

function callDaiToEth() {
    onesplitContract.methods.getExpectedReturn(toToken, fromToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({
        from: ''
    }, function (error, result) {
        if (error) {
            console.log(error)
            return;
        }

        console.table([{
            'Input Token': 'Dai',
            'Output Token': 'Eth',
            "Trade Amount: ": amountToExchange,
            'Amount Returned': new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString()
          }])
    });

}



setInterval(async () => {
    await callDaiToEth();
    await callEthToDai();
}, 3000)
