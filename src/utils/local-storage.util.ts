/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";
const localStorageUtil = {
  getItem(key: any, cryptoKey: string) {
    try {
      let item: any = localStorage.getItem(key);
      item = CryptoJS.AES.decrypt(item, cryptoKey);
      item = JSON.parse(item.toString(CryptoJS.enc.Utf8));
      return item;
    } catch (error) {
      return null;
    }
  },
  setItem(key: any, cryptoKey: string, data: any) {
    try {
      let item: any = JSON.stringify(data);
      item = CryptoJS.AES.encrypt(item, cryptoKey).toString();
      localStorage.setItem(key, item);
    } catch (error) {
      return null;
    }
  },
};
export default localStorageUtil;
