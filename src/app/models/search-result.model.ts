export interface SearchResultPaginatied {
  current_page: number;
  data: SearchResult[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: string;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface SearchResult {
  self: Paragraph;
  similars?: Similar[];
}

export interface Similar {
  paragraph: Paragraph;
  similarity: Similarity;
}

export interface Similarity {
  covered: number;
  covers: number;
}

export interface Paragraph {
  id: number;
  para_id: string;
  parent_1: string;
  parent_2: string;
  parent_3: string;
  parent_4: string;
  parent_5: string;
  parent_6: string;
  refcode_1: string;
  refcode_2: string;
  refcode_short: string;
  refcode_long: string;
  book_title: string;
  section_title?: (null | string)[];
  chapter_title: string;
  content: string;
  stemmed_wordlist: string;
  element_subtype: string;
  puborder: number;
  year: string;
  primary_collection_text_id: string;
}
