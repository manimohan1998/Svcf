import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.MemberName.substr(it.MemberName.indexOf('.')+1).toLowerCase().startsWith(terms) || it.GrpMemberID.toLowerCase().startsWith(terms) ||it.GrpMemberID.toLowerCase().includes(terms) ||it.MemberName.toLowerCase().includes(terms) ||it.MemberName.toLowerCase().startsWith(terms) ; 
    });
  }
 

}
