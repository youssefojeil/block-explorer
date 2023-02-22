import { Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

const HomePage = ({ alchemy }) => {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    async function getCurrentBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      // console.log(blockNumber);

      const block = await alchemy.core.getBlockWithTransactions(blockNumber);

      // console.log(block.transactions.slice(0, 10));
      setLatestTransactions(block.transactions.slice(0, 10));
    }

    async function getCurrentGasPrice() {
      const gasPrice = await alchemy.core.getGasPrice();
      const gasPriceGwei = Utils.formatUnits(gasPrice._hex, "gwei");
      setGasPrice(gasPriceGwei);
      // console.log(gasPrice._hex);
      // console.log(Utils.formatUnits(gasPrice._hex, "gwei"));
    }

    getCurrentBlockNumber();
    getCurrentGasPrice();
  }, []);

  return (
    <div>
      <div className="App">Block Number: {blockNumber}</div>
      <div className="App"> Gas Price: {gasPrice} gwei</div>

      <div className="App">
        <p>Latest Transactions</p>
        {latestTransactions.map((transaction) => (
          <div>
            <li>Transaction: {transaction.hash}</li>
            <li>From: {transaction.from}</li>
            <li>To: {transaction.to}</li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
