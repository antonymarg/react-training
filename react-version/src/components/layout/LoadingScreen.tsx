interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
}
