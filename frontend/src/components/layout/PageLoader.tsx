export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div
          className="h-6 w-6 animate-spin border border-white/20 border-t-white"
          aria-label="Loading"
        />
        <p className="editorial-label">Loading</p>
      </div>
    </div>
  );
}
