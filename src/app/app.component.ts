import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSelected = false;
  questionList: { id: number, questionText: string, attachmentList: {}[] }[] = [];

  ngOnInit() {
    this.questionList = [
      {
        id: 1,
        questionText: 'Does the FD level documents captured* ?',
        attachmentList: [
          { label: 'Mandate Available', value: 1 },
          { label: 'Identification Proof', value: 2 },
          { label: 'KYC Form', value: 3 },
          { label: 'Recipt', value: 4 },
          { label: 'PoA & Other', value: 5 },
          { label: 'Payment method initiation documents', value: 6 },
          { label: 'Power Of Atony', value: 7 },
          { label: 'Other', value: 8 }
        ]
      },
      {
        id: 2,
        questionText: 'Is current mailing address supported by the identity proof?',
        attachmentList: [
          { label: 'Power Of Atony', value: 1 },
          { label: 'Other', value: 2 }
        ]
      },
      {
        id: 3,
        questionText: 'Form 40 or Form 1 ?',
        attachmentList: [
          { label: 'Mandate', value: 1 }
        ]
      }
    ];
  }
}
