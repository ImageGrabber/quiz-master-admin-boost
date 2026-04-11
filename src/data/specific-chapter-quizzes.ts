import { genesisQuizzes } from './chapters/genesis';
import { exodusQuizzes } from './chapters/exodus';
import { genesisSpecializedQuizzes } from './chapters/genesis-specialized';
import { leviticusQuizzes } from './chapters/leviticus';
import { leviticusLevelQuizzes } from './chapters/leviticus-levels';
import { johnQuizzes } from './chapters/john';
import { thessalonians2Quizzes } from './chapters/thessalonians2';

export const specificChapterQuizzes: Record<string, any> = {
    ...genesisQuizzes,
    ...exodusQuizzes,
    ...genesisSpecializedQuizzes,
    ...leviticusQuizzes,
    ...leviticusLevelQuizzes,
    ...johnQuizzes,
    ...thessalonians2Quizzes
};
