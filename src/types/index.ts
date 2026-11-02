export interface SourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface SourcesList {
  status: string;
  sources: SourceItem[];
}

export interface ArticleSource extends Pick<SourceItem, 'name'> {
  id: string | null;
}

export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface ArticlesList {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const enum Endpoints {
  SOURCES = 'sources',
  EVERYTHING = 'everything',
}

export type Options = Record<string, string>;
export type ReqOptions = {
  apiKey: string;
} & Options;

export type RequestParams = Partial<{
  category: string;
  language: string;
  country: string;
  sources: string;
  q: string;
  pageSize: string;
  page: string;
}>;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
