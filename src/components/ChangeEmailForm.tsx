import { useState } from "react";

// Define the prop types
interface ChangeEmailFormProps {
    currentEmail: string;
    onSubmit: (newEmail: string) => void;
}

export default function ChangeEmailForm({ currentEmail, onSubmit }: ChangeEmailFormProps) {
    const [newEmail, setNewEmail] = useState(currentEmail);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newEmail);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input 
                type="email" 
                value={newEmail} 
                onChange={(e) => setNewEmail(e.target.value)} 
                placeholder="New email" 
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
