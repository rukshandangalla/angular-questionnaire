import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSelected = false;
  questionList: { id: number, question_text: string, attachmentList: {}[] }[] = [];

  ngOnInit() {
    // this.questionList = [
    //   { id: 1, question_text: 'Does the FD level documents captured* ?' },
    //   { id: 2, question_text: 'Is current mailing address supported by the identity proof?' },
    //   { id: 3, question_text: 'Form 40 or Form 1 ?' },
    //   { id: 4, question_text: 'Is place of incorporation outside Sri Lanka and principal place of business in SL?' },
    //   { id: 5, question_text: 'Is List & particles of directors outside Sri Lanka and principal place of business in SL?' },
    //   { id: 6, question_text: 'Is BOI Approved Company?' },
    //   { id: 7, question_text: 'Is EDB Approved Company?' },
    //   { id: 8, question_text: 'Is Public Quoted Company?' }
    // ];

    this.questionList = [
      {
        id: 1,
        question_text: 'Does the FD level documents captured* ?',
        attachmentList: [
          { label: 'Mandate', value: 1 },
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
        question_text: 'Is current mailing address supported by the identity proof?',
        attachmentList: [
          { label: 'Mandate', value: 1 }
        ]
      }
    ];
  }
}
