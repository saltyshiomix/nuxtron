import { BrowserWindow, BrowserWindowConstructorOptions, Rectangle, screen } from 'electron';
import Store from 'electron-store';

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key = 'window-state';
  const name = `window-state-${windowName}`;
  const store = new Store({ name });
  const bounds = screen.getPrimaryDisplay().bounds;
  const defaultSize: Rectangle = {
    width: options.width ?? bounds.width,
    height: options.height ?? bounds.height,
    x: options.x ?? bounds.x,
    y: options.y ?? bounds.y
  };

  let win: BrowserWindow;

  const restore = () => <Rectangle>store.get(key, defaultSize);

  const getCurrentPosition = (): Rectangle => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };

  const windowWithinBounds = (windowState: Rectangle, bounds: Rectangle) => {
    let test = true;

    const items = [
      windowState.x >= bounds.x,
      windowState.y >= bounds.y,
      windowState.x + windowState.width <= bounds.x + bounds.width,
      windowState.y + windowState.height <= bounds.y + bounds.height
    ];

    items.forEach(item => {
      test = test && item;
    });

    return test;
  };

  const resetToDefaults = (): Rectangle => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle) => {
    const visible = screen.getAllDisplays().some(display => windowWithinBounds(windowState, display.bounds));

    // Window is partially or fully not visible now.
    // Reset it to safe defaults.
    return visible ? windowState : resetToDefaults();
  };

  const saveState = () => {
    const target = (!win.isMinimized() && !win.isMaximized()) ? Object.assign(state, getCurrentPosition()) : state;
    store.set(key, target);
  };

  const state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options, ...state,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true
    }
  };
  win = new BrowserWindow(browserOptions);

  win.on('close', saveState);

  return win;
};
