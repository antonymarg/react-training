interface HeaderProps {
  onAddCharacter: () => void;
}

export function Header({ onAddCharacter }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 p-4 backdrop-blur-sm sm:p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-4xl">💪</span>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Lego Characters
        </h1>
      </div>
      <button
        onClick={onAddCharacter}
        className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 flex items-center gap-2 transition-colors"
      >
        <span className="text-lg">+</span>
        <span className="sm:hidden">Add</span>
        <span className="hidden sm:inline">Add Character</span>
      </button>
    </header>
  );
}
