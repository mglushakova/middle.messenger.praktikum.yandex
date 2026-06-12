class ChatSocket {
  private socket: WebSocket | null = null;
  private messageHandler?: (data: unknown) => void;
  private openHandler?: () => void;

  connect(url: string) {
    this.disconnect();

    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      this.openHandler?.();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      this.messageHandler?.(data);
    });
  }

  disconnect() {
    this.socket?.close();
  }

  sendMessage(content: string) {
    this.socket?.send(
      JSON.stringify({
        content,
        type: 'message',
      }),
    );
  }

  getOldMessages(count = 20) {
    this.socket?.send(
      JSON.stringify({
        content: String(count),
        type: 'get old',
      }),
    );
  }

  onMessage(callback: (data: unknown) => void) {
    this.messageHandler = callback;
  }

  onOpen(callback: () => void) {
    this.openHandler = callback;
  }

  onClose(callback: () => void) {
    this.socket?.addEventListener('close', callback);
  }

  onError(callback: (event: Event) => void) {
    this.socket?.addEventListener('error', callback);
  }
}

export const chatSocket = new ChatSocket();
