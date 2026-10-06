import CounterLoading from "./CounterLoading";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <CounterLoading />
      <p className="text-sm text-gray-600">Processing your request...</p>
    </div>
  );
}
