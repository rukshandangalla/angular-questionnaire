import { QuestionnaireSessionQuestionAnswerDetailBaseVM } from './questionnaire.session.question.answer.detail.base.vm';

export interface QuestionnaireSessionQuestionAnswerDetailExtAttachmentVM extends QuestionnaireSessionQuestionAnswerDetailBaseVM {
  mpt_DocumentTypeEnum?: number;
  attachmentId?: number;
}
