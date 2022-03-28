import WebSocket from 'isomorphic-ws';
import WS from 'jest-websocket-mock';

describe('upbit exchanges', () => {
  test('rejects connections that fail the verifyClient option', async () => {
    new WS('ws://localhost:1234', { verifyClient: () => false });
    const errorCallback = jest.fn();

    await expect(
      new Promise((resolve, reject) => {
        errorCallback.mockImplementation(reject);
        const client = new WebSocket('ws://localhost:1234');
        client.onerror = errorCallback;
        client.onopen = resolve;
      }),
      // WebSocket onerror event gets called with an event of type error and not an error
    ).rejects.toEqual(expect.objectContaining({ type: 'error' }));
  });
});
