import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'showDel'
})
export class ShowDelPipe implements PipeTransform {

  transform(text: any, showDeletions: boolean): any {
    if (!showDeletions) {
      return text.replace(/<del>.+?<\/del>/g, '<del class="no-select">•</del>');
    }
    return text;
  }

}
