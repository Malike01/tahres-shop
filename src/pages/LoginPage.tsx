import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export const LoginPage: React.FC= () => {
  const [userInfo, setUserInfo] = useState({ email:'', password:'', id:'0', name:'' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(userInfo);
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-black text-center text-white mb-2 uppercase tracking-wider">Giriş Yap</h2>
        <p className="text-center text-gray-400 mb-8">Hesabınıza erişin</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-500/20 text-red-400 text-center p-3 rounded-md mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">E-posta</label>
            <input 
              id="email"
              type="email" 
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Şifre</label>
            <input 
              id="password"
              type="password" 
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value }) }
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required 
            />
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-md hover:bg-cyan-400 transition-colors duration-300">
            Giriş Yap
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Hesabın yok mu?{' '}
          <button onClick={() => register(userInfo)} className="text-cyan-400 hover:underline font-semibold">
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
};
