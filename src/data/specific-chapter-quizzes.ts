import { genesisQuizzes } from './chapters/genesis';
import { leviticusQuizzes } from './chapters/leviticus';
import { johnQuizzes } from './chapters/john';
import { thessalonians2Quizzes } from './chapters/thessalonians2';

export const specificChapterQuizzes: Record<string, any> = {
    ...genesisQuizzes,
    ...leviticusQuizzes,
    ...johnQuizzes,
    ...thessalonians2Quizzes
};
