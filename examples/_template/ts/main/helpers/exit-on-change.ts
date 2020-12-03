import { app } from 'electron';
import { watchFile } from 'fs';
import { join } from 'path';

export default function exitOnChange(): void {
  watchFile(join(process.cwd(), 'app/background.js'), () => {
    app.exit(0);
  });
};
