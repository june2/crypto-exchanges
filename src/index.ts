import { Upbit } from './exchanges';

const codes = process.argv[2] ?? 'KRW-BTC,KRW-ETH,BTC-ETH,BTC-LTC,BTC-XRP';

const upbit = new Upbit(codes.split(','));

upbit.Open({ type: 'orderbook', isOnlySnapshot: true }, () => {
  console.log('socket connected.');
});

upbit.OnMessage((res) => {
  console.log(res);
});

upbit.OnClose(() => {
  console.log('socket closed');
});
