import re

with open("src/pages/PublicQuiz.tsx", "r") as f:
    text = f.read()

# Fix layout background
text = re.sub(
    r'min-h-screen bg-\[\#030303\].*?pb-20',
    'min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-sky-50 to-rose-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900 pb-20',
    text,
    flags=re.DOTALL
)

# Fix header dark mode
text = text.replace('border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl', 'border-b border-white/60 bg-white/60 backdrop-blur-3xl')
text = text.replace('rounded-lg bg-white/10 border border-white/5 text-white', 'rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 border-transparent shadow-[0_4px_15px_rgba(244,63,94,0.3)] text-white')
text = text.replace('text-white sm:text-base cursor-pointer', 'text-stone-900 sm:text-base cursor-pointer')
text = text.replace('text-white sm:text-base uppercase', 'text-stone-900 sm:text-base uppercase')

# Fix score display in header
text = text.replace('bg-white/5 rounded-full border border-white/10 shadow-inner', 'bg-white/60 rounded-full border border-white/80 shadow-sm backdrop-blur-md')
text = text.replace('tabular-nums tracking-widest text-white drop-shadow-md', 'tabular-nums tracking-widest text-stone-800 font-black')
text = text.replace('text-[11px] font-black tabular-nums tracking-widest text-stone-300', 'text-[11px] font-black tabular-nums tracking-widest text-stone-600')

# Fix exit button in header
text = text.replace('text-stone-400 hover:text-white hover:bg-white/10', 'text-stone-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 shadow-sm bg-white/40')

# Make the question typography more premium colorful gradient
text = text.replace('from-stone-900 via-stone-800 to-stone-600', 'from-amber-600 via-rose-600 to-indigo-600')

# Left side options list gradients and shadows (make white boxes soft glassmorphism)
text = text.replace('bg-white border border-stone-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)]', 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]')

with open("src/pages/PublicQuiz.tsx", "w") as f:
    f.write(text)

