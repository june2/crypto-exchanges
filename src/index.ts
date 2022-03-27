import { Upbit } from './exchanges/upbit';

const upbit = new Upbit(['KRW-BTC', 'KRW-ETH', 'BTC-ETH', 'BTC-LTC', 'BTC-XRP']);

upbit.Open({ type: 'orderbook', isOnlySnapshot: true }, () => {
  console.log('socket connected.');
});

upbit.OnMessage((res) => {
  console.log(res);
});
