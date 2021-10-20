import { contextBridge, ipcRenderer } from 'electron';
import ReoApi from './reoapi';

const reoapi: ReoApi = {
    closePaypalLoginPopup() {
        ipcRenderer.send('close-paypal', '');
    },
};

contextBridge.exposeInMainWorld('reoapi', reoapi);
