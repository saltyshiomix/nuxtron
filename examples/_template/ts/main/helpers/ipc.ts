import { ipcMain, BrowserWindow, Event } from 'electron';

const getResponseChannels = (channel: string) => ({
  sendChannel: `%nextron-send-channel-${channel}`,
  dataChannel: `%nextron-response-data-channel-${channel}`,
  errorChannel: `%nextron-response-error-channel-${channel}`,
});

const getRendererResponseChannels = (windowId: number, channel: string) => ({
  sendChannel: `%nextron-send-channel-${windowId}-${channel}`,
  dataChannel: `%nextron-response-data-channel-${windowId}-${channel}`,
  errorChannel: `%nextron-response-error-channel-${windowId}-${channel}`,
});

export default class ipc {
  static callRenderer(window: BrowserWindow, channel: string, data: any) {
    return new Promise((resolve, reject) => {
      const {
        sendChannel,
        dataChannel,
        errorChannel,
      } = getRendererResponseChannels(window.id, channel);

      const cleanup = () => {
        ipcMain.removeAllListeners(dataChannel);
        ipcMain.removeAllListeners(errorChannel);
      };

      ipcMain.on(dataChannel, (_: Event, result: any) => {
        cleanup();
        resolve(result);
      });

      ipcMain.on(errorChannel, (_: Event, error: any) => {
        cleanup();
        reject(error);
      });

      if (window.webContents) {
        window.webContents.send(sendChannel, data);
      }
    });
  }

  static answerRenderer(channel: string, callback: Function) {
    const { sendChannel, dataChannel, errorChannel } = getResponseChannels(
      channel,
    );

    ipcMain.on(sendChannel, async (event: Event, data: any) => {
      const window = BrowserWindow.fromWebContents(event.sender);

      const send = (channel: string, data: any) => {
        if (!(window && window.isDestroyed())) {
          event.sender.send(channel, data);
        }
      };

      try {
        send(dataChannel, await callback(data, window));
      } catch (error) {
        send(errorChannel, error);
      }
    });
  }

  static sendToRenderers(channel: string, data: any) {
    for (const window of BrowserWindow.getAllWindows()) {
      if (window.webContents) {
        window.webContents.send(channel, data);
      }
    }
  }
}
