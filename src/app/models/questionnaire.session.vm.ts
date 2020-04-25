import { QSessionQuestionVM } from './questionnaire.session.question.vm';

export interface QuestionnaireSessionVM {
  id?: number;
  mpt_ReferenceSurfaceEnum?: number;
  referenceId?: number;
  questionnaireOperationId?: number;
  QuestionCount?: number;
  remarks?: string;
  sessionQuestionVMs?: QSessionQuestionVM[];
}
