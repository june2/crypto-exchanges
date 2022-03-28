### 요구사항

```
과제를 수행할 기본 프로젝트 생성
웹소켓 이용하기
WebSocket을 이용하여 수신할 수 있는 정보 중 호가 정보만 가져오기
업비트에서 지원하는 5가지 마켓에 대한 호가 정보 가져오기
KRW-BTC, KRW-ETH 포함
https://api.upbit.com/v1/market/all 여기서 지원하는 페어 중 5가지를 골라서 호가 정보를 불러오기.
데이터 처리 (\* 아래 예시 데이터 형태)
5가지 페어의 호가 정보를 변환하여 메모리에 저장하기.
페어를 키 값으로 하고 asks(매도호가들), bids(매수호가들)를 배열로 가지는 데이터 만들기
asks는 price기준으로 오름차순, bids는 price기준으로 내림차순 정렬
```

### 실행방법

```

#npm 모듈 설치
yarn


#application 실행
$ yarn start

#CLI 활용

$ yarn start [SYMBOL-CODE]
$ yarn start KRW-BTC

\*\* args 미입력시, KRW-BTC,KRW-ETH,BTC-ETH,BTC-LTC,BTC-XRP으로 default 셋업

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
