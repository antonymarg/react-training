import { CharacterCard } from "./CharacterCard";
import type { Character } from "@/lib/types";

interface CharacterGridProps {
  characters: Character[];
  onDeleteCharacter: (characterId: string) => void;
}

export function CharacterGrid({ characters, onDeleteCharacter }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {characters.map((character) => (
        <CharacterCard 
          key={character.id} 
          character={character} 
          onDelete={onDeleteCharacter}
        />
      ))}
    </div>
  );
}
