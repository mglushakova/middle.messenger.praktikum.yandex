class ChatSocket {
  private socket: WebSocket | null = null;
  private messageHandler?: (data: unknown) => void;
  private openHandler?: () => void;
  private closeHandler?: () => void;
  private pingInterval?: ReturnType<typeof setInterval>;

  private send(data: unknown) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;

    this.socket.send(JSON.stringify(data));
  }

  connect(url: string) {
    this.disconnect();

    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      this.openHandler?.();

      this.startPing();
      this.getOldMessages(0);
    });

    this.socket.addEventListener('close', () => {
      this.closeHandler?.();
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageHandler?.(data);
      } catch (error) {
        console.error(error);
      }
    });
  }

  disconnect() {
    this.stopPing();
    this.socket?.close();
    this.socket = null;
  }

  sendMessage(content: string) {
    this.send({
      content,
      type: 'message',
    });
  }

  getOldMessages(count = 20) {
    this.send({
      content: String(count),
      type: 'get old',
    });
  }

  onMessage(callback: (data: unknown) => void) {
    this.messageHandler = callback;
  }

  startPing() {
    this.stopPing();

    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 10_000);
  }

  stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    }
  }

  onOpen(callback: () => void) {
    this.openHandler = callback;
  }

  onClose(callback: () => void) {
    this.closeHandler = callback;
  }

  onError(callback: (event: Event) => void) {
    this.socket?.addEventListener('error', callback);
  }
}

export const chatSocket = new ChatSocket();
