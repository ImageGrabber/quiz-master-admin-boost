interface AppPreloaderProps {
  message?: string;
}

const AppPreloader = ({ message = "Preparing your Bible quiz experience..." }: AppPreloaderProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/60 flex items-center justify-center px-6">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/70 p-8 text-center">
        <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white grid place-items-center shadow-lg shadow-orange-200 animate-pulse">
          <span className="text-2xl">✝</span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Bible Quiz Competition</h1>
        <p className="mt-2 text-sm text-slate-600 font-medium">{message}</p>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 animate-[pulse_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default AppPreloader;

