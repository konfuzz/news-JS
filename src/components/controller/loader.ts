import {
  type Options,
  type ReqOptions,
  type RequestParams,
  type ArticlesList,
  type SourcesList,
  type HttpMethod,
  type Endpoints,
} from '../../types';

class Loader {
  public readonly baseLink: string;
  public readonly options: ReqOptions;

  constructor(baseLink: string, options: ReqOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T extends ArticlesList | SourcesList>(
    { endpoint, options = {} }: { endpoint: Endpoints; options?: RequestParams },
    callback = (data: T): void => {
      if (!data) {
        console.error('No callback for GET response');
      }
    },
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: RequestParams, endpoint: Endpoints): string {
    const urlOptions: Options & RequestParams = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: HttpMethod,
    endpoint: Endpoints,
    callback: (data: T) => void,
    options: RequestParams = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
