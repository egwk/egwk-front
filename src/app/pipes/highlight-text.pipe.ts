import {Pipe, PipeTransform} from "@angular/core";
import {SafeHtml} from "@angular/platform-browser";

@Pipe({name: "highlightText"})
export class HighlightTextPipe implements PipeTransform {

  /* use this for single match search */
  static SINGLE_MATCH: string = "Single-Match";
  /* use this for single match search with a restriction that target should start with search string */
  static SINGLE_AND_STARTS_WITH_MATCH: string = "Single-And-StartsWith-Match";
  /* use this for global search */
  static MULTI_MATCH: string = "Multi-Match";

  constructor() {
  }

  protected replaceTokens(text) {
    return text.replace('*', '.*');
  }

  transform(data: string,
            highlightText: string,
            option: string = "Multi-Match",
            caseSensitive: boolean = false,
            highlightStyleName: string = "search-highlight"): SafeHtml {
    if (highlightText && data && option) {
      let processedHighlightText = this.replaceTokens(highlightText);
      let regex: any = "";
      let caseFlag: string = !caseSensitive ? "i" : "";
      switch (option) {
        case "Single-Match": {
          regex = new RegExp(processedHighlightText, caseFlag);
          break;
        }
        case "Single-And-StartsWith-Match": {
          regex = new RegExp("^" + processedHighlightText, caseFlag);
          break;
        }
        case "Multi-Match": {
          regex = new RegExp(processedHighlightText, "g" + caseFlag);
          break;
        }
        default: {
          // default will be a global case-insensitive match
          regex = new RegExp(processedHighlightText, "gi");
        }
      }
      return data.replace(regex, (match) => `<span class="${highlightStyleName}">${match}</span>`);

    } else {
      return data;
    }
  }
}
