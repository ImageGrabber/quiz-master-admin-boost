import re

with open("src/pages/PublicQuiz.tsx", "r") as f:
    content = f.read()

start_marker = '      <div className="container mx-auto px-4 max-w-2xl px-6">'
end_marker = '      {/* Time Warning Dialog */}'

# Extract the parts
before_split = content.split(start_marker)[0]
after_split = end_marker + content.split(end_marker)[1]

new_block = """      <div className="container mx-auto px-4 lg:max-w-6xl pb-12">
        {/* Mobile Timer */}
        <div className="sm:hidden flex justify-center mb-8">
          <div className="flex items-center gap-2 px-5 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
            <Clock className={`h-4 w-4 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`} />
            <span className={`text-sm font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-stone-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-4 items-start">
          
          {/* ==================== LEFT SIDE: QUESTION & OPTIONS ==================== */}
          <div className="flex-1 w-full space-y-8">
            <div className="mb-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 bg-white border border-stone-200 shadow-sm px-3 py-1.5 rounded-full self-start">
                  <span className="flex h-2 w-2 rounded-full bg-orange-500 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  </span>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] pt-0.5 drop-shadow-sm">QUESTION {currentQuestion + 1} <span className="text-stone-400 mx-1">/</span> {questions.length}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] font-black text-stone-500 bg-white border border-stone-200 shadow-sm px-3 py-1.5 rounded-full uppercase tracking-widest leading-none pt-0.5">{bookName} {chapter ? `CH. ${chapter}` : 'SEC'}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-[2.5rem] font-black text-stone-900 leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-stone-900 via-stone-800 to-stone-600 pb-2 drop-shadow-sm">
                {currentQ.question}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.answer;
                const showCorrect = hasSubmitted && isCorrectAnswer;
                const showWrong = hasSubmitted && isSelected && !isCorrectAnswer;

                let stateStyles = '';
                let textStyles = '';
                let letterBoxStyles = '';

                if (hasSubmitted) {
                  if (showCorrect) {
                    stateStyles = 'border-green-400 bg-green-50 shadow-[0_4px_20px_rgba(34,197,94,0.15)] scale-[1.01] sm:scale-[1.02] z-10';
                    textStyles = 'text-green-800';
                    letterBoxStyles = 'bg-green-500 text-white shadow-sm border-transparent';
                  } else if (showWrong) {
                    stateStyles = 'border-red-400 bg-red-50 shadow-[0_4px_15px_rgba(239,68,68,0.1)]';
                    textStyles = 'text-red-800';
                    letterBoxStyles = 'bg-red-500 text-white border-transparent';
                  } else {
                    stateStyles = 'border-stone-200 bg-stone-50 opacity-60 cursor-default';
                    textStyles = 'text-stone-500';
                    letterBoxStyles = 'bg-stone-200/50 text-stone-400 border-stone-200';
                  }
                } else {
                  stateStyles = isSelected 
                    ? 'border-orange-400 bg-orange-50 shadow-[0_4px_20px_rgba(249,115,22,0.15)] scale-[1.01] sm:scale-[1.02] z-10' 
                    : 'border-stone-200 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:border-orange-300 hover:bg-orange-50 hover:shadow-[0_8px_25px_rgba(249,115,22,0.08)] text-stone-700 hover:-translate-y-1 hover:text-stone-900';
                  textStyles = isSelected ? 'text-orange-900 drop-shadow-sm' : 'text-stone-700 group-hover:text-stone-900 group-hover:translate-x-1';
                  letterBoxStyles = isSelected ? 'bg-orange-500 text-white shadow-sm border border-orange-500/50' : 'bg-stone-50 text-stone-400 border border-stone-100 group-hover:bg-orange-100 group-hover:text-orange-600 group-hover:border-orange-200';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={hasSubmitted}
                    className={`
                      relative flex items-center w-full p-5 sm:p-6 text-left transition-all duration-500 rounded-3xl border group overflow-hidden
                      ${stateStyles}
                    `}
                  >
                    {!hasSubmitted && !isSelected && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />}
                    
                    <div className={`
                      relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black mr-5 transition-all duration-300
                      ${letterBoxStyles}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`text-base font-bold leading-snug pr-8 transition-all duration-300 ${textStyles}`}>{option}</span>
                    
                    {!hasSubmitted && isSelected && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-6 w-6 text-orange-500 animate-in zoom-in spin-in-12 duration-300" />
                      </div>
                    )}
                    {hasSubmitted && showCorrect && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-6 w-6 text-green-600 animate-in zoom-in spin-in-12 duration-300" />
                      </div>
                    )}
                    {hasSubmitted && showWrong && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <AlertTriangle className="h-6 w-6 text-red-500 animate-in zoom-in spin-in-12 duration-300" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== RIGHT SIDE: FEEDBACK, ACTIONS & REFERENCE ==================== */}
          <div className="w-full lg:w-[45%] flex flex-col space-y-6 sticky top-28">
            <div className={`flex flex-col rounded-[2rem] border overflow-hidden transition-all duration-700 ${hasSubmitted ? (selectedAnswer === currentQ.answer ? 'bg-green-50/80 border-green-200 shadow-[0_8px_40px_rgba(34,197,94,0.15)]' : 'bg-red-50/80 border-red-200 shadow-[0_8px_40px_rgba(239,68,68,0.15)]') : 'bg-white border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)]'}`}>
              
              <div className="p-8 sm:p-10 min-h-[200px] flex flex-col justify-center">
                {!hasSubmitted ? (
                  <div className="text-center w-full flex flex-col items-center gap-6 py-6 animate-in fade-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-stone-100/50 animate-pulse"></div>
                       <Brain className="w-8 h-8 text-stone-300 drop-shadow-sm relative z-10" />
                    </div>
                    <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-sm">Awaiting your answer</span>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                      {selectedAnswer === currentQ.answer ? (
                        <>
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full p-2.5 shadow-[0_0_20px_rgba(34,197,94,0.4)]"><CheckCircle className="w-6 h-6" /></div>
                          <span className="font-black text-green-700 text-3xl tracking-tight drop-shadow-sm">Excellent!</span>
                        </>
                      ) : (
                        <>
                          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full p-2.5 shadow-[0_0_20px_rgba(239,68,68,0.4)]"><AlertTriangle className="w-6 h-6" /></div>
                          <span className="font-black text-red-700 text-3xl tracking-tight drop-shadow-sm">Not Quite</span>
                        </>
                      )}
                    </div>
                    
                    {currentQ.explanation && (
                      <p className={`text-lg font-medium ${selectedAnswer === currentQ.answer ? 'text-green-800' : 'text-red-800'} leading-relaxed pl-1 pb-2`}>
                        {currentQ.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Reference Module */}
              {currentQ.referenceVerse && (
                <div className={`px-8 sm:px-10 pb-8 pt-6 border-t ${hasSubmitted ? 'border-stone-200/50 bg-white/50' : 'border-stone-100 bg-stone-50'}`}>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-4 block">Scriptural Context</span>
                  <button 
                    onClick={() => {
                      setSelectedVerse(currentQ.referenceVerse || "");
                      const chMatch = currentQ.referenceVerse.match(/\s(\d+):/);
                      setSelectedChapterId(chMatch ? parseInt(chMatch[1]) : parseInt(chapter || "1"));
                      setIsVerseContextOpen(true);
                    }}
                    className="group flex w-full items-center justify-between gap-4 text-left rounded-2xl bg-white hover:bg-orange-50 px-5 py-4 border border-stone-200 hover:border-orange-300 hover:shadow-[0_4px_15px_rgba(249,115,22,0.1)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-stone-100 rounded-xl group-hover:bg-orange-500 text-stone-500 group-hover:text-white transition-colors duration-300">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-black text-stone-900 text-base md:text-lg tracking-tight">{currentQ.referenceVerse}</span>
                        <span className="block text-[10px] uppercase text-stone-500 group-hover:text-orange-600 tracking-widest mt-0.5 transition-colors">Read Chapter Segment</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-orange-500 transition-colors duration-300" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
              {!hasSubmitted ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className={`
                    h-16 px-10 sm:px-14 rounded-full font-black text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500 relative overflow-hidden group/btn w-full sm:w-auto
                    ${selectedAnswer !== null 
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-500 hover:to-amber-500 shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:-translate-y-1 active:scale-95' 
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                    }
                  `}
                >
                  {selectedAnswer !== null && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />}
                  <span className="relative z-10 flex items-center justify-center gap-3 w-full drop-shadow-sm">
                    Check Answer
                  </span>
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  size="lg"
                  className="h-16 px-10 sm:px-14 rounded-full font-black text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500 relative overflow-hidden group/btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-95 w-full sm:w-auto mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                    {currentQuestion === questions.length - 1 ? 'Complete Quest' : 'Continue'}
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
"""

full_content = before_split + new_block + after_split

with open("src/pages/PublicQuiz.tsx", "w") as f:
    f.write(full_content)

