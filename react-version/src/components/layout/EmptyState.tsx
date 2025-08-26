interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white/50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-blue-600">
          {title}
        </h2>
        <p className="mt-2 text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}
