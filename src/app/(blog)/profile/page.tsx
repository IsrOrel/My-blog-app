'use client'
import { useEffect, useState } from "react";
import { z } from "zod";
import { signupSchema } from '@/lib/validation';
import ChangeNameForm from "../../../components/ChangeNameForm";
import ChangeEmailForm from "../../../components/ChangeEmailForm";
import ChangePasswordForm from "../../../components/ChangePasswordForm";
import { useTranslation } from '@/lib/i18n';

export default function ProfilePage() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { locale, t } = useTranslation();
    const isRTL = locale === 'he';

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser({ name: data.user.name, email: data.user.email });
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    const handleNameSubmit = async (newName: string) => {
        setError(null);
        try {
            const response = await fetch("/api/auth/profile/update-name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newName, email: user.email }),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                setUser({ ...user, name: newName });
                setMessage(t('name_updated_success'));
                setActiveForm(null);
            } else {
                setError(data.message || t('name_update_failed'));
            }
        } catch (err) {
            setError(t('error_try_again'));
        }
    };
    
    const handleEmailSubmit = async (newEmail: string) => {
        setError(null);
        try {
            const response = await fetch("/api/auth/profile/update-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    currentEmail: user.email,
                    newEmail: newEmail,
                }),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                setUser({ ...user, email: newEmail });
                setMessage(t('email_updated_success'));
                setActiveForm(null);
            } else {
                setError(data.message || t('email_update_failed'));
            }
        } catch (err) {
            setError(t('error_try_again'));
        }
    };

    const handlePasswordSubmit = async (newPassword: string) => {
        setError(null);
        try {
            signupSchema.pick({ password: true }).parse({ password: newPassword });
    
            const response = await fetch("/api/auth/profile/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: user.email,
                    password: newPassword,
                }),
            });
    
            const data = await response.json();
            
            if (response.ok) {
                setMessage(t('password_updated_success'));
                setActiveForm(null);
            } else {
                setError(data.message || t('password_update_failed'));
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else {
                setError(t('error_try_again'));
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center p-6 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-5xl font-extrabold text-white text-center">{t('my_profile')}</h1>
            <p className="text-xl text-white mt-2 text-center">{t('update_info_here')}</p>
            
            {message && (
                <div className="p-3 rounded-lg bg-green-600 text-white">
                    {message}
                </div>
            )}
            
            {error && (
                <div className="p-3 rounded-lg bg-red-600 text-white">
                    {error}
                </div>
            )}
            
            <div className={`bg-gray-800 p-6 rounded-lg w-full max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl text-white">{isRTL ? `${user.name} :${t('name')}` : `${t('name')}: ${user.name}`}</p>
                    <button 
                        onClick={() => setActiveForm(activeForm === "name" ? null : "name")}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                        {activeForm === "name" ? t('cancel') : t('change')}
                    </button>
                </div>
                
                {activeForm === "name" && <ChangeNameForm currentName={user.name} onSubmit={handleNameSubmit} />}
                
                <div className="flex justify-between items-center mb-4 mt-6">
                    <p className="text-xl text-white">{isRTL ? `${user.email} :${t('email')}` : `${t('email')}: ${user.email}`}</p>
                    <button 
                        onClick={() => setActiveForm(activeForm === "email" ? null : "email")}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                        {activeForm === "email" ? t('cancel') : t('change')}
                    </button>
                </div>
                
                {activeForm === "email" && <ChangeEmailForm currentEmail={user.email} onSubmit={handleEmailSubmit} />}
                
                <div className="flex justify-between items-center mb-4 mt-6">
                    <p className="text-xl text-white">{t('password')}</p>
                    <button 
                        onClick={() => setActiveForm(activeForm === "password" ? null : "password")}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                        {activeForm === "password" ? t('cancel') : t('change')}
                    </button>
                </div>
                
                {activeForm === "password" && <ChangePasswordForm onSubmit={handlePasswordSubmit} />}
            </div>
        </div>
    );
}