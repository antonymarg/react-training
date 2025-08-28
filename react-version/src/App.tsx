import { useState, useEffect } from "react";
import { AddCharacterModal } from "./components/character/AddCharacterModal";
import { Header } from "./components/layout/Header";
import { LoadingScreen } from "./components/layout/LoadingScreen";
import { EmptyState } from "./components/layout/EmptyState";
import { CharacterGrid } from "./components/character/CharacterGrid";
import type { Character } from "./lib/types";
import { seedCharacters } from "./lib/seed";
import { Counter } from "./components/ui/Counter";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCharacters = localStorage.getItem("lego-characters");
      if (storedCharacters) {
        setCharacters(JSON.parse(storedCharacters));
      } else {
        setCharacters(seedCharacters);
      }
    } catch (error) {
      console.error("Failed to parse characters from localStorage", error);
      setCharacters(seedCharacters);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lego-characters", JSON.stringify(characters));
    }
  }, [characters, isMounted]);

  const handleAddCharacter = (newCharacterData: Omit<Character, "id">) => {
    const newCharacter: Character = {
      ...newCharacterData,
      id: `char_${new Date().getTime()}`,
    };
    setCharacters((prev) => [newCharacter, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteCharacter = (characterId: string) => {
    setCharacters((prev) => prev.filter(char => char.id !== characterId));
  };

  if (!isMounted) {
    return <LoadingScreen message="Loading Characters..." />;
  }

  return (
    <>
      <AddCharacterModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onAddCharacter={handleAddCharacter}
      />
      <div className="flex min-h-screen w-full flex-col bg-gray-50">
        <Header onAddCharacter={() => setIsModalOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          {characters.length === 0 ? (
            <EmptyState
              title="Your Collection is Empty"
              message='Click the "Add Character" button to build your first character!'
            />
          ) : (
            <CharacterGrid 
              characters={characters} 
              onDeleteCharacter={handleDeleteCharacter}
            />
          )}
          <Counter 
            initialValue={0}
            label="Test Counter" 
          />
        </main>
      </div>
    </>
  );
}
