import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
      return term && Array.isArray(items) ? items.filter(item => item.game.name.toLowerCase().includes(term.toLowerCase())) : items;
  }
}
