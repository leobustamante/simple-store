import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(array, path: string, order: number) {
    // Check if is not null
    if (!array || !path) {
      return array;
    }

    return array.sort((a, b) => {
      a = a[path];
      b = b[path];
      return a > b ? order : order * (- 1);
    });
  }
}
