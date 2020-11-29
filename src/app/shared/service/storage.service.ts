import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  static setData(key: string, data: string): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (e) {
      throw new Error('Provided data is not serializable!');
    }
  }

  static getData(key: string): [] {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  static setItem(key: string, data: string): string {
    localStorage.setItem(key, data);
    return data;
  }

  static getItem(key: string): string {
    return localStorage.getItem(key);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  constructor() {
    if (typeof Storage === 'undefined') {
      throw new Error('StorageService: Local storage is not supported');
    }
  }
}
