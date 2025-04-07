import { useState } from "react";

// Define the prop types
interface ChangePasswordFormProps {
    onSubmit: (newPassword: string) => void;
}

export default function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="New password" 
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
