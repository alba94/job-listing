import { Pipe, PipeTransform } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(jobs: JobPostingEntity[]): JobPostingEntity[] {
    const sortedJobs = jobs.reverse();
    return sortedJobs;
  }
}
