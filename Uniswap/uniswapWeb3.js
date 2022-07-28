const { ethers } = require("ethers");

const { ChainId, Fetcher, WETH, Route } = require('@uniswap/sdk');

const chainId = ChainId.RINKEBY;

const tokenAddress = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";

const init = async () => {

    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
    const weth = WETH[chainId];
    const pair = await Fetcher.fetchPairData(dai, weth);
    const route = new Route([pair], weth);
    //console.log(route);

    console.log(route.midPrice.toSignificant(6));

    console.log(route.midPrice.invert().toSignificant(6));
}

init();