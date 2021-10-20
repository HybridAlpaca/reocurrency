import {
    app, protocol, globalShortcut, ipcMain, BrowserWindow,
} from 'electron';
import express from 'express';
import request from 'request';
import path from 'path';

// create server
{
    const server = express();
    server.listen(() => console.log('Server is running'));
}
// app connects to server
// database

/** Runs when the app is opened */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, './renderer.cjs'),
        },
    });

    win.removeMenu();
    win.loadFile('../../pages/index.html');

    // development shortcuts
    globalShortcut.register('f5', () => win.loadFile('../../pages/index.html'));
    globalShortcut.register('CommandOrControl+R', () => win.loadFile('../../pages/index.html'));
    globalShortcut.register('f12', () => win.webContents.toggleDevTools());
    globalShortcut.register('CommandOrControl+Shift+I', () => win.webContents.toggleDevTools());

    // TODO this is *dangerous* -- allows unsolicited access to the filesystem
    // not sure if electron has this problem anyway; research required
    protocol.interceptFileProtocol('file', (req, callback) => {
        let url = req.url.substr(8);
        const ext = path.extname(url);
        if (ext !== '.html') {
            console.log(url);
            url = path.resolve(__dirname, '..', url.substr(3));
            console.log(url);
        }
        callback({ path: url });
    });
};

app
    .on('activate', () => {
        // for iOS/OSX
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
    .on('window-all-closed', () => {
        // for iOS/OSX
        if (process.platform !== 'darwin') app.quit();
    })
    .whenReady().then(createWindow);

ipcMain.on('close-paypal', () => {
    BrowserWindow.getAllWindows().forEach((win) => {
        // The Paypal window would fail to load contents due to security
        // restrictions and return an empty URL
        if (!win.webContents.getURL()) {
            win.close();
        }
    });
});

// ====================================
// MOVE TO ENV BEFORE PUSHING TO GITHUB
// ====================================

ipcMain.on('buy-some-shit', () => {
    // boob
    const endpoint = 'https://api-m.sandbox.paypal.com';

    request.post(`${endpoint}/v1/payments/payment`, {
        auth: {
            user: client,
            pass: secret,
        },
        body: {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [{
                amount: {
                    total: '5.99',
                    currency: 'USD',
                },
            }],
            redirect_urls: {
                return_url: 'https://example.com',
                cancel_url: 'https://example.com',
            },
        },
        json: true,
    }, (err, response) => { console.log('pee'); });
});
