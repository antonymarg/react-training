import { useState } from "react";

interface CounterProps {
    initialValue: number;
    label: string;
  }
  
export function Counter({ 
    initialValue,
    label
  }: CounterProps) {
    const [count, setCount] = useState(initialValue) 
    return (
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <h3>{label}</h3>
        <p>Current value: {count}</p>
        <button type="button" onClick={() => setCount(count+1)}>
            +
        </button>
        <button type="button" onClick={() => setCount(count -1)}>
          -
        </button>
      </div>
    );
  }
