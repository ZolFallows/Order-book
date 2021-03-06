import React, { Component } from "react";
import {
  connectSocket,
  subscribe,
  unsubscribe
} from "../../services/api-service";
import OrderStream from "../OrderStream/index";
import { BTC_USD, XRP_USD, SELECT_CURRENCY } from "../../utils/constants";

const DATA_EVENT = "data";

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      book: "",
      error: null,
      currencies: [
        { value: BTC_USD.value, option: BTC_USD.option },
        { value: XRP_USD.value, option: XRP_USD.option }
      ],
      ordersData: null
    };
  }

  componentDidMount() {
    this.setState({
      book: "",
      error: null
    });
    connectSocket(this.onMessageHandler); 
  }

  onMessageHandler = ev => {
    const { event, data } = ev && ev.data ? JSON.parse(ev.data) : {};
    if (event === DATA_EVENT) {
      // add new message to state 
      this.setState({
        ordersData: data
      });
    }
  };

  handleOnChange = e => {
    const currencyPairSubscribe = e.target.value;
    const currencyPairUnsubscribe = this.state.book;
    if (currencyPairUnsubscribe) {
      unsubscribe(currencyPairUnsubscribe); // unsubscribe previous channel if exist 
    }
    if (currencyPairSubscribe === SELECT_CURRENCY) {
      return this.setState({ ordersData: null }); // if current currency pair is 'select currency', reset orderData
    }
    subscribe(currencyPairSubscribe);
    this.setState({ book: currencyPairSubscribe }); // make sure subscribe is successful before updating state
  };

  render() {
    const { ordersData, book } = this.state;
    const options = this.state.currencies.map((option, idx) => (
      <option key={idx} value={option.value.toLowerCase()}>
        {option.option}
      </option>
    ));

    return (
      <>
        <h1>Order Book</h1>
        <div className="order">
          {this.context.error !== null && (
            <div className="alert-error">{this.context.errors}</div>
          )}
          <select className="select-currency" onChange={this.handleOnChange}>
            <option defaultValue="Select currency">Select currency</option>
            {options}
          </select>
          <div className="list">
            <OrderStream ordersData={ordersData} currencyPair={book} />
          </div>
        </div>
      </>
    );
  }
}