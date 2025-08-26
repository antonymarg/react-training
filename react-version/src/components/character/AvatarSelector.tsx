interface AvatarOption {
  src: string;
  label: string;
  hint: string;
}

interface AvatarSelectorProps {
  options: AvatarOption[];
  selectedAvatar: string;
  onAvatarSelect: (avatarSrc: string) => void;
}

export function AvatarSelector({ options, selectedAvatar, onAvatarSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((avatar, index) => (
        <label
          key={index}
          className={`flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer hover:bg-gray-50 ${
            selectedAvatar === avatar.src
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="avatar"
            value={avatar.src}
            checked={selectedAvatar === avatar.src}
            onChange={(e) => onAvatarSelect(e.target.value)}
            className="sr-only"
          />
          <img
            src={avatar.src}
            width={80}
            height={80}
            alt={avatar.label}
            data-ai-hint={avatar.hint}
            className="mb-2 rounded-lg"
          />
          <span className="text-sm font-medium">{avatar.label}</span>
        </label>
      ))}
    </div>
  );
}
