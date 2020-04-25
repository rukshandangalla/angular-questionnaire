import { QuestionnaireChoiceDetailVM } from './questionnaire.choice.detail.vm';
import { QuestionnaireSessionQuestionAnswerHeaderVM } from './questionnaire.session.question.answer.header.vm';

export interface QuestionnaireSessionQuestionVM {
  id?: number;
  questionnaireSessionId?: number;
  priority?: number;
  questionnaireOperationQuestionId?: number;
  questionnaireQuestionHeaderId?: number;
  isRequired: boolean;
  isSkipped: boolean;
  questionDescription: string;
  mpt_QuestionnaireAnswerTypeEnum?: number;
  questionnaireChoiceTypeEnum?: number;
  questionnaireChoiceTypeVersion?: number;
  isCompleted: boolean;
  parentQuestionnaireSessionQuestionId?: number;
  choiceDetailVMs?: QuestionnaireChoiceDetailVM[];
  childSessionQuestionVMs?: QuestionnaireSessionQuestionVM[];
  sessionQuestionAnswerHeaderVMs?: QuestionnaireSessionQuestionAnswerHeaderVM[]
}
