import { Buffer } from 'safe-buffer';
import { API_BASE_URL } from './apiConfiguration'
import { deviceDetect } from 'react-device-detect'

export const redirectToClickURL = (e, vendorURL) => {
    e.preventDefault();
    const base64URL = new Buffer(vendorURL).toString('base64');
    const clientDeviceData = new Buffer( JSON.stringify(deviceDetect()) ).toString('base64')
    // console.log(`${API_BASE_URL}/click?url=${base64URL}&cdd=${clientDeviceData}`);
    window.open(`${API_BASE_URL}/click?url=${base64URL}&cdd=${clientDeviceData}`, '_blank');
};