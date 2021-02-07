"use strict";
const AxiosBase = require('../util/axiosBase');
class Books {
  constructor(isbn) {
    this._isbn = isbn;
    // https://api.openbd.jp/v1/get?isbn=978-4-7808-0204-7&pretty
    this._request = new AxiosBase('https://api.openbd.jp/v1/')
  }

  get isbn() {
    return this._isbn;
  }
  set isbn(isbn) {
    this._isbn = isbn;
  }

  async search(isbn = this._isbn) {
    let param = `?isbn=${isbn}`;
    return await this._request.get(`get${param}`)
      .then(response => {
        if(response.data[0] == null)
        {
          throw new Error(`[ISBN Not Found] ${param}`);
        }
        if(response.status == 200) {
          return response.data;
        }
        throw new Error(`[Bad Response] ${response}`);
      })
      .catch(err => { throw new Error(err); });
  }
}

module.exports = Books;