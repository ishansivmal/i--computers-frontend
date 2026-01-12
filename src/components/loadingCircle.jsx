export function LoadingCircle() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  );
}