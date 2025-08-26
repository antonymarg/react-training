import { useState } from "react";
import { AVATAR_OPTIONS, SKILLS } from "@/lib/constants";
import type { Character } from "@/lib/types";
import { Modal } from "../ui/Modal";
import { ModalHeader } from "../ui/ModalHeader";
import { FormField } from "../ui/FormField";
import { AvatarSelector } from "./AvatarSelector";
import { SkillSelector } from "./SkillSelector";
import { FormActions } from "../ui/FormActions";

interface AddCharacterModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddCharacter: (character: Omit<Character, "id">) => void;
}

export function AddCharacterModal({ isOpen, setIsOpen, onAddCharacter }: AddCharacterModalProps) {
  const [name, setName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [errors, setErrors] = useState<{ name?: string; skills?: string; avatar?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: { name?: string; skills?: string; avatar?: string } = {};
    
    if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    
    if (selectedSkills.length === 0) {
      newErrors.skills = "You must select at least one skill.";
    }
    
    if (!selectedAvatar) {
      newErrors.avatar = "You need to select an avatar.";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onAddCharacter({
        name,
        skills: selectedSkills,
        avatar: selectedAvatar,
      });
      // Reset form
      setName("");
      setSelectedSkills([]);
      setSelectedAvatar("");
      setErrors({});
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-6">
        <ModalHeader
          title="Create a New Character"
          subtitle="Fill in the details below to build your character."
          onClose={() => setIsOpen(false)}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Character Name" error={errors.name}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Captain Brickbeard"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Choose Avatar" error={errors.avatar}>
            <AvatarSelector
              options={AVATAR_OPTIONS}
              selectedAvatar={selectedAvatar}
              onAvatarSelect={setSelectedAvatar}
            />
          </FormField>

          <FormField label="Skills" error={errors.skills}>
            <SkillSelector
              skills={SKILLS}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillChange}
              description="Select the abilities your character possesses."
            />
          </FormField>

          <FormActions
            onCancel={() => setIsOpen(false)}
            submitText="Create Character"
          />
        </form>
      </div>
    </Modal>
  );
}