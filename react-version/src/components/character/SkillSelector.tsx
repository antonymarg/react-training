interface SkillSelectorProps {
  skills: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string, checked: boolean) => void;
  description?: string;
}

export function SkillSelector({ skills, selectedSkills, onSkillToggle, description }: SkillSelectorProps) {
  return (
    <div>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <label
            key={skill}
            className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={(e) => onSkillToggle(skill, e.target.checked)}
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">{skill}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
