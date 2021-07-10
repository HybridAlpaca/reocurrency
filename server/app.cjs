const { app, protocol, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
    });

    win.removeMenu();
    win.loadFile('../pages/index.html');

    protocol.interceptFileProtocol('file', (request, callback) => {
        let url = request.url.substr(8);
        const ext = path.extname(url);

        if (ext !== '.html') {
            url = path.resolve(__dirname, '../static/', url.substr(3));
        }

        callback({ path: url });
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
