import React from "react";
import { getCurrency } from "../../utils/currency";
import { getCoin } from "../../utils/coin";
import { 
  sortBids, 
  sortAsks 
} from "../../utils/sort";
const OrderStream = ({ ordersData, currencyPair }) => {
  if (ordersData) {
    const { bids, asks } = ordersData;
    const sortedBids = sortBids(bids); // sorted by descending price
    const sortedAsks = sortAsks(asks); // sorted by ascending price
    const coin = getCoin(currencyPair);
    const currency = getCurrency(currencyPair);
    console.log(sortedBids, bids)
    console.log(sortedAsks, asks)
    const market = sortedBids.map(([bidPrice, bidCoinAmount], index) => {
      const [askPrice, askCoinAmount] = sortedAsks[index];
      const bid = `${bidCoinAmount} ${coin} @ ${bidPrice} ${currency}`;
      const ask = `${askCoinAmount} ${coin} @  ${askPrice} ${currency}`;
      return (
        <tr key={index}>
          <td>{bid}</td>
          <td>{ask}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Bids</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>{market}</tbody>
      </table>
    );
  }
  return <div className="select-msg">Please select order...</div>;
};

export default OrderStream;