import type { Character } from "@/lib/types";

interface CharacterCardProps {
  character: Character;
  onDelete: (characterId: string) => void;
}

export function CharacterCard({ character, onDelete }: CharacterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(character.id)}
        className="absolute top-3 right-3 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 z-10 shadow-lg hover:shadow-xl hover:scale-110"
        title="Delete character"
      >
        ✕
      </button>
      
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={character.avatar}
          alt={`Avatar of ${character.name}`}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          data-ai-hint="lego character"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {character.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {character.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs font-medium bg-yellow-200 text-gray-800 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}