import { useState } from "react";

// Define the prop types
interface ChangeNameFormProps {
    currentName: string;
    onSubmit: (newName: string) => void;
}

export default function ChangeNameForm({ currentName, onSubmit }: ChangeNameFormProps) {
    const [newName, setNewName] = useState(currentName);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newName);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                placeholder="New name" 
                className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button 
                type="submit" 
                className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Submit
            </button>
        </form>
    );
}
