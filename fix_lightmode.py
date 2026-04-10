import re

with open("src/pages/PublicQuiz.tsx", "r") as f:
    code = f.read()

# Replace main background
code = code.replace(
    '''bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,53,15,0.4),rgba(0,0,0,1))] text-[#fafaf9] flex selection:bg-orange-500/30 selection:text-orange-200''', 
    '''bg-stone-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,237,213,0.7),rgba(255,255,255,0))] text-[#1c1917] flex selection:bg-orange-100 selection:text-orange-900'''
)
code = code.replace(
    '''bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,53,15,0.4),rgba(0,0,0,1))] text-[#fafaf9] font-sans selection:bg-orange-500/30 selection:text-orange-200''', 
    '''bg-stone-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,237,213,0.7),rgba(255,255,255,0))] text-[#1c1917] font-sans selection:bg-orange-100 selection:text-orange-900'''
)

# Header substitutions
code = code.replace("border-white/5 bg-[#0a0a0a]/80", "border-stone-200/60 bg-white/80")
code = code.replace("border-white/5 bg-[#0a0a0a]/90", "border-stone-200/60 bg-white/90")
code = code.replace("bg-white/10 border border-white/5 text-white", "bg-stone-900 border-transparent text-white")
code = code.replace("text-white sm:text-base", "text-stone-900 sm:text-base")
code = code.replace("group-hover:bg-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]", "group-hover:scale-110")
code = code.replace("text-stone-400 hover:text-white hover:bg-white/10", "text-stone-500 hover:text-stone-800 hover:bg-stone-100")

# Badges and Progress
code = code.replace("bg-white/5 border border-white/10", "bg-white border border-stone-200")
code = code.replace("text-white/40 drop-shadow-md", "text-stone-300")
code = code.replace("bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/10", "bg-white border border-stone-200 shadow-sm px-3 py-1.5 rounded-full")

# Typography Questions
code = code.replace("text-white leading-[1.15]", "text-stone-900 leading-[1.15]")
code = code.replace("text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500", "text-transparent bg-clip-text bg-gradient-to-br from-stone-900 via-stone-800 to-stone-500")

# Option Buttons
code = code.replace("border-white/5 bg-white/5 opacity-40", "border-stone-200 bg-stone-50 opacity-60")
code = code.replace("bg-black/30 text-stone-600 border-white/5", "bg-stone-200/50 text-stone-400 border-stone-200")
code = code.replace("border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-orange-500/40 hover:bg-orange-500/5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] text-stone-300 hover:-translate-y-1 hover:text-white", "border-stone-200 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:border-orange-300 hover:bg-orange-50 hover:shadow-[0_8px_25px_rgba(249,115,22,0.08)] text-stone-700 hover:-translate-y-1 hover:text-stone-900")
code = code.replace("text-stone-300 group-hover:text-white", "text-stone-700 group-hover:text-stone-900")
code = code.replace("bg-black/40 text-stone-500 border border-white/10", "bg-stone-50 text-stone-400 border border-stone-100")
code = code.replace("group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/40", "group-hover:bg-orange-100 group-hover:text-orange-600 group-hover:border-orange-200")

# Verify Panel Container
code = code.replace("bg-[#0a2f1b]/40 border-[#115e2e]/50 shadow-[0_8px_40px_rgba(20,83,45,0.4)]", "bg-green-50/80 border-green-200 shadow-[0_8px_40px_rgba(34,197,94,0.15)]")
code = code.replace("bg-[#350a0a]/40 border-[#7f1d1d]/50 shadow-[0_8px_40px_rgba(127,29,29,0.4)]", "bg-red-50/80 border-red-200 shadow-[0_8px_40px_rgba(239,68,68,0.15)]")
code = code.replace("bg-white/5 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]", "bg-white border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)]")

# Verify Text
code = code.replace("text-green-300 text-3xl", "text-green-700 text-3xl")
code = code.replace("text-green-100/90", "text-green-800")
code = code.replace("text-red-300 text-3xl", "text-red-700 text-3xl")
code = code.replace("text-red-100/90", "text-red-800")

# Verse reference
code = code.replace("border-white/10 bg-black/20", "border-stone-100 bg-stone-50")
code = code.replace("border-white/5 bg-black/10", "border-stone-100 bg-stone-50/50")
code = code.replace("text-white text-base md:text-lg", "text-stone-900 text-base md:text-lg")
code = code.replace("group-hover:bg-white/20 text-orange-400 group-hover:text-white", "group-hover:bg-orange-500 text-orange-500 group-hover:text-white")

# Action bar
code = code.replace("bg-white/5 text-stone-600 cursor-not-allowed border border-white/5", "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200")

with open("src/pages/PublicQuiz.tsx", "w") as f:
    f.write(code)
