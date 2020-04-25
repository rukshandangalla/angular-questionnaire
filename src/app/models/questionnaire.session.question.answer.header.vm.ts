import { QuestionnaireSessionQuestionAnswerDetailExtAttachmentVM } from './questionnaire.session.question.answer.detail.ext.attachment.vm';
import { QuestionnaireSessionQuestionAnswerDetailExtBoolVM } from './questionnaire.session.question.answer.detail.ext.bool.vm';
// tslint:disable-next-line: max-line-length
import { QuestionnaireSessionQuestionAnswerDetailExtChoiceSelectionVM } from './questionnaire.session.question.answer.detail.ext.choice.selection.vm';
import { QuestionnaireSessionQuestionAnswerDetailExtLocationVM } from './questionnaire.session.question.answer.detail.extLocation.vm';
import { QuestionnaireSessionQuestionAnswerDetailExtTextVM } from './questionnaire.session.question.answer.detailExt.text.vm';

export interface QuestionnaireSessionQuestionAnswerHeaderVM {
  id?: number;
  questionnaireSessionQuestionId?: number;
  isReadOnly?: boolean;
  isPredefined?: boolean;
  sessionQuestionAnswerDetailExtAttachmentVM?: QuestionnaireSessionQuestionAnswerDetailExtAttachmentVM[];
  sessionQuestionAnswerDetailExtBoolVM?: QuestionnaireSessionQuestionAnswerDetailExtBoolVM[];
  sessionQuestionAnswerDetailExtChoiceSelectionVM?: QuestionnaireSessionQuestionAnswerDetailExtChoiceSelectionVM[];
  sessionQuestionAnswerDetailExtLocationVM?: QuestionnaireSessionQuestionAnswerDetailExtLocationVM[];
  sessionQuestionAnswerDetailExtTextVM?: QuestionnaireSessionQuestionAnswerDetailExtTextVM[];
}
