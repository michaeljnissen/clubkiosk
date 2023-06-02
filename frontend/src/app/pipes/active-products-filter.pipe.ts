import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'activeProductsFilter'
})

@Injectable()
export class ActiveProductsFilterPipe implements PipeTransform {
  transform(items: any[], active: boolean): any[] {

    if(!items) return [];
    if(!active) return items;

    return items.filter( item => {
      return item.active
    });
  }
}
