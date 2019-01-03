export interface BookModel {
  book_code: string;
  tr_code: string;
  book_id: string;
  title: string;
  tr_title: string;
  tr_title_alt: string;
  summary?: string | null;
  translator: string;
  lang: string;
  publisher: string;
  year: string;
  no: number;
  publisher_name: string;
  primary_collection_text_id: string;
  collection_name: string;
  seq: number;
  text_id: string;
  text_id_alt: string;
  church_approved: number;
  edition_id: string;
  book_uri: string;
  toc_uri: string;
  translation_uri: string;
  zip_uri: string;
}
