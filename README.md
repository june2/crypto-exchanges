

### 실행방법

```sh

#npm 모듈 설치
yarn

#application 실행
$ yarn start

#CLI 활용
#args 미입력시, KRW-BTC,KRW-ETH,BTC-ETH,BTC-LTC,BTC-XRP으로 default 셋업
$ yarn start [SYMBOL-CODE]
$ yarn start KRW-BTC


```

### 사용 예제

```js
import { Upbit } from './exchanges';

const codes = process.argv[2] ?? 'KRW-BTC,KRW-ETH,BTC-ETH,BTC-LTC,BTC-XRP';

const upbit = new Upbit(codes.split(','));

upbit.Open({ type: 'orderbook', isOnlySnapshot: true }, () => {
  console.log('socket connected.');
});

upbit.OnMessage((res) => {
  console.log(res);
});
```
