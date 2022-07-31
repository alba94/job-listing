import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, enteredSearchValue: string) {
    if(value.length === 0 || enteredSearchValue === ''){
      return value;
    }
    const jobs = [];
    for(const job of value){
      job.title.toLowerCase();
      enteredSearchValue.toLowerCase();
      if(job['title'].includes(enteredSearchValue)){
        jobs.push(job);
      }
    }
    return jobs;
  }

}
