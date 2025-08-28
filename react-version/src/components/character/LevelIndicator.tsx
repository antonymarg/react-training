interface LevelIndicatorProps {
    level: number;
  }
  
  export function LevelIndicator({ level }: LevelIndicatorProps) {
    // Determine color scheme based on level ranges
    const getColorScheme = (level: number) => {
      if (level >= 20) return "bg-purple-500 text-white border-purple-600"; // Legendary
      if (level >= 15) return "bg-yellow-500 text-gray-900 border-yellow-600"; // Epic
      if (level >= 10) return "bg-blue-500 text-white border-blue-600"; // Rare
      if (level >= 5) return "bg-green-500 text-white border-green-600"; // Uncommon
      return "bg-gray-500 text-white border-gray-600"; // Common
    };
  
    const colorScheme = getColorScheme(level);
  
    return (
      <div 
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm shadow-lg ${colorScheme} `}
        title={`Level ${level}`}
      >
        {level}
      </div>
    );
  }
  