export interface ParagraphModel {
  id: number;
  para_id: string;
  id_prev: string;
  id_next: string;
  refcode_1: string;
  refcode_2: string;
  refcode_3: string;
  refcode_4: string;
  refcode_short: string;
  refcode_long: string;
  element_type: string;
  element_subtype: string;
  stemmed_wordlist: string;
  year: string;
  primary_collection_text_id: string;
  content: string;
  puborder: number;
  parent_1: string;
  parent_2: string;
  parent_3: string;
  parent_4: string;
  parent_5: string;
  parent_6: string;
  translations?: (null)[] | null;
}

export interface TranslatedParagraphModel extends ParagraphModel{
  lang: string;
  no: number;
  publisher: string;
  toc_uri: string;
  tr_content: string;
  year: string;
}

