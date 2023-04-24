import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationTimeAgo'
})
export class NotificationTimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const currentDate = new Date();
    const inputDate = new Date(value);

    const diffSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears}y ago`;
    } else if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return `${diffSeconds}s ago`;
    }
  }

}
