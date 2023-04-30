import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
    console.log("hello")
    console.log("the error message is ya kareem: ", this.errorMessage)
    this.show();
  }

  show() {
    console.log("modal is displayed");
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('show');
      console.log("modal is displayed");
    }
  }

  close() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('show');
  }

}
