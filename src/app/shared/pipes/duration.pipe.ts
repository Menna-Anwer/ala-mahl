import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'studyDuration' })
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return hours ? `${hours} ساعة${rest ? ` و${rest} دقيقة` : ''}` : `${minutes} دقيقة`;
  }
}
