# Bible Quiz Hub Architecture & Standards

This document serves as the official reference for the Bible Quiz Hub's data structures, routing logic, and content standards.

## 1. Quiz Types

### A. Chapter-Specific Quizzes
- **URL Pattern**: `/bible-questions-and-answers-hub/:book/chapter-:id`
- **Data Source**: `src/data/chapters/:book.ts`
- **Registry**: `src/data/specific-chapter-quizzes.ts`
- **Key Format**: `:book-:id` (e.g., `genesis-1`, `leviticus-27`)
- **Structure**: Each book data file exports a record of chapters, where each chapter contains a `questions` array.

### B. Difficulty-Based Quizzes (Standard)
- **Levels**: Beginner, Intermediate, Advanced.
- **URL Pattern**: `/bible-questions-and-answers-hub/:bookSlug/:difficulty`
- **Data Source**: `src/data/chapters/:bookSlug-levels.ts` (Moving toward data-driven)
- **Registry Key**: `:bookSlug-:level` (e.g., `leviticus-beginner`)
- **Logic**: Handled by `HubDifficultyRouter.tsx`.

### C. Narrative/Specialized Quizzes
- **Types**: Fill-in-the-blanks, True/False, Characters, Timeline Match.
- **Registry Key**: `:bookSlug-:type` (e.g., `genesis-true-false`)

## 2. Content Standards ("The Gold Standard")

All queries should strive to match the quality of the Genesis Hub:
- **Questions**: Must include 10+ unique questions per module.
- **Attributes**:
    - `question`: Clear, concise text.
    - `options`: 4 distinct choices (except for True/False).
    - `answer`: 0-indexed integer.
    - `explanation`: Detailed context, often quoting the verse.
    - `referenceVerse`: Exact Bible reference (e.g., "Genesis 1:1").
- **Visuals**: Use cinematic imagery from `/public/images/hubs/:bookSlug/`.

## 3. Implementation Patterns

### Legacy (Hardcoded Component)
Used for early Genesis modules. Requires a dedicated `.tsx` file for each level (e.g., `GenesisBeginnerQuiz.tsx`).

### Modern (Data-Driven)
Scalable approach using `PublicQuiz.tsx` as a generic renderer.
1. Define questions in `src/data/chapters/`.
2. Register in `specificChapterQuizzes` in `src/data/specific-chapter-quizzes.ts`.
3. `HubDifficultyRouter` automatically resolves the data via the slug.

## 4. Maintenance
When adding a new book:
1. Generate cinematic assets and place in `/public/images/hubs/:book/`.
2. Create chapter data file (`leviticus.ts`).
3. Create level data file (`leviticus-levels.ts`).
4. Register both in the central registry.
5. Verify via the Hub UI.
