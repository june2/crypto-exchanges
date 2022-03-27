import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'isomorphic-ws';

interface UpbitSocketPayload {
  type: 'ticker' | 'trade' | 'orderbook';
  isOnlySnapshot?: boolean;
  isOnlyRealtime?: boolean;
  format?: 'DEFAULT' | 'SIMPLE';
}

interface IUpbitResponse {
  asks: Array<IUpbitOrderbookResponse>;
  bids: Array<IUpbitOrderbookResponse>;
}

interface IUpbitOrderbookResponse {
  price: number;
  quantity: number;
}

interface IOrderbook {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum Order {
  ASK = 'ASK',
  BID = 'BID',
}

export class Upbit {
  private ws: WebSocket;
  private codes: Array<string>;
  private data: any = {};

  constructor(codes: Array<string>) {
    this.ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    this.codes = codes;
  }

  private getOrder(data: Array<IOrderbook>, type: Order = Order.ASK, sort: Sort = Sort.ASC) {
    return data
      .map((orderbook) => {
        return type === Order.ASK
          ? {
              price: orderbook.ask_price,
              quantity: orderbook.ask_size,
            }
          : {
              price: orderbook.bid_price,
              quantity: orderbook.bid_size,
            };
      })
      .sort((a, b) => (sort === Sort.ASC ? (a.price > b.price ? 1 : -1) : a.price > b.price ? -1 : 1));
  }

  public Open(payload: UpbitSocketPayload, cb?: Function) {
    this.ws.onopen = (e) => {
      this.ws.send(`${JSON.stringify([{ ticket: uuidv4() }, { codes: this.codes, ...payload }])}`);
      if (cb) {
        cb();
      }
    };
  }

  public Close() {
    this.ws.close();
  }

  public OnClose(cb: Function) {
    this.ws.onclose = () => {
      cb();
    };
  }

  public OnMessage(cb: (data: any) => void) {
    this.ws.onmessage = async (payload) => {
      const response = JSON.parse(payload.data.toString('utf-8'));
      const data: Array<IOrderbook> = response.orderbook_units;

      //asks는 price기준으로 오름차순, bids는 price기준으로 내림차순 정렬
      const unitBook: IUpbitResponse = {
        asks: this.getOrder(data, Order.ASK, Sort.ASC),
        bids: this.getOrder(data, Order.BID, Sort.DESC),
      };

      this.data[response.code] = unitBook;

      cb(this.data);
    };
  }
}
