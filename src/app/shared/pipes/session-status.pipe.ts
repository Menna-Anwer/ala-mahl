import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'sessionStatus' })
export class SessionStatusPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'completed' ? 'مكتملة' : 'مخططة';
  }
}
