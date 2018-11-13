import { DomSanitizer } from '@angular/platform-browser'
import { TestBed, inject } from '@angular/core/testing';
import { HighlightTextPipe } from './highlight-text.pipe';

fdescribe('AutoComplete Component - Highlight pipe', () => {
  let pipe: HighlightTextPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {
        provide: DomSanitizer,
        useValue: {
          bypassSecurityTrustHtml: v => v
        }
      }, HighlightTextPipe
      ]
    });
  });

  beforeEach(inject([HighlightTextPipe], p => {
    pipe = p;
  }));

  it('highlights search term in the text', () => {
    let result = pipe.transform('search text', 'text');
    expect(result).toBe('search <span class="search-highlight">text</span>')
  });

  it('shoudl return same text', () => {
    let result = pipe.transform('search text', '');
    expect(result).toBe('search text', 'search text')
  });
});
