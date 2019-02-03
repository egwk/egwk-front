export class PaginatedModel<T> {
  current_page: string;
  protected _data: Array<T>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;

  set data(data) {
    if (typeof data === 'object') {
      this._data = Object.values(data);
    } else {
      this._data = data;
    }
  }

  get data() {
      return this._data;
  }

}
