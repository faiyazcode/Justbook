import CryptoJS from 'crypto-js';

export const encryptData = (data)=>{
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_PRIVATE_KEY).toString();
}

export const decryptData = (data)=>{
    return JSON.parse(CryptoJS.AES.decrypt(data, process.env.REACT_APP_PRIVATE_KEY).toString(CryptoJS.enc.Utf8))
}   