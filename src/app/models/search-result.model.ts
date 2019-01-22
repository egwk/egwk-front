import {PaginatedModel} from "./paginated.model";
import {ParagraphModel} from "./paragraph.model";

export interface SearchResultPaginatied extends PaginatedModel<SearchResult> {}

export interface SearchResult {
  self: SimilarParagraph;
  similars?: Similar[];
}

export interface Similar {
  paragraph: SimilarParagraph;
  similarity: Similarity;
}

export interface Similarity {
  covered: number;
  covers: number;
}

export interface SimilarParagraph extends ParagraphModel{
  book_title: string;
  section_title?: (null | string)[];
  chapter_title: string;
  translations?: (null)[] | null;
}
