import { Buffer } from 'safe-buffer';
import { API_BASE_URL } from './apiConfiguration'

export const redirectToClickURL = (e, vendorURL) => {
    e.preventDefault();
    const base64URL = new Buffer(vendorURL).toString('base64');
    window.open(`${API_BASE_URL}/click?url=${base64URL}`, '_blank');
};