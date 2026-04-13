/**
 * Minimal ChatAPI WebSocket client — no SDK dependency.
 * Connects via wss://<host>/ws?token=<jwt>, exchanges plain JSON frames.
 */

type EventHandler = (data: any) => void;

export class ChatAPISocket {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<EventHandler>>();
  private pingInterval: ReturnType<typeof setInterval> | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private stopped = false;

  constructor(private baseURL: string, private token: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.doConnect(resolve, reject);
    });
  }

  private doConnect(resolve?: () => void, reject?: (e: Error) => void) {
    const wsURL = this.baseURL.replace(/^http/, "ws") + `/ws?token=${this.token}`;
    const ws = new WebSocket(wsURL);
    this.ws = ws;
    let settled = false;

    ws.onopen = () => {
      settled = true;
      this.startPing();
      resolve?.();
    };

    ws.onerror = () => {
      if (!settled) {
        settled = true;
        reject?.(new Error("WebSocket connection failed"));
      }
    };

    ws.onclose = () => {
      this.stopPing();
      if (!this.stopped) this.scheduleReconnect();
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.emit(msg.type, msg);
      } catch {}
    };
  }

  disconnect() {
    this.stopped = true;
    this.stopPing();
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.ws?.close();
    this.ws = null;
  }

  send(payload: object) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }

  sendMessage(roomId: string, content: string) {
    this.send({ type: "send_message", data: { room_id: roomId, content, meta: {} } });
  }

  on(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
  }

  off(event: string, handler: EventHandler) {
    this.handlers.get(event)?.delete(handler);
  }

  private emit(event: string, data: any) {
    this.handlers.get(event)?.forEach((h) => h(data));
  }

  private startPing() {
    this.pingInterval = setInterval(() => this.send({ type: "ping" }), 30000);
  }

  private stopPing() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    this.pingInterval = null;
  }

  private scheduleReconnect(delay = 2000) {
    this.reconnectTimeout = setTimeout(() => {
      this.doConnect();
      // doConnect without resolve/reject — errors are silent on reconnect
    }, delay);
  }
}
