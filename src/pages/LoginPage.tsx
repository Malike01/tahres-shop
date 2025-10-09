import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>;
const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.81C21.54,11.9 21.35,11.1 21.35,11.1V11.1Z"></path></svg>;

const createLoginSchema = (t: (key: string) => string) => z.object({
  name:z.string().min(2, { message: t('validation.nameMinLength') }),
  email: z.string().email({ message: t('validation.invalidEmail') }),
  password: z.string().min(1, { message: t('validation.passwordRequired') }),
});

const createRegisterSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t('validation.nameMinLength') }),
  email: z.string().email({ message: t('validation.invalidEmail') }),
  password: z.string().min(6, { message: t('validation.passwordMinLength') }),
});

type FormInputs = z.infer<ReturnType<typeof createLoginSchema>> | z.infer<ReturnType<typeof createRegisterSchema>>;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const LoginPage: React.FC= () => {
  const { login, register: authRegister  } = useAuth();
  const [formType, setFormType] = useState<'login' | 'register'>(
    location.pathname === '/register' ? 'register' : 'login'
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginSchema = createLoginSchema(t);
  const registerSchema = createRegisterSchema(t);
  const currentSchema = formType === 'login' ? loginSchema : registerSchema;

   const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>({
    resolver: zodResolver(currentSchema),
  });

  const handleFormSwitch = (type: 'login' | 'register') => {
    setApiError('');
    reset();
    setFormType(type);
    navigate(type === 'login' ? '/login' : '');
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data:any) => {
    setApiError('');
    try {
      if (formType === 'login') {
        await login(data);
      } else {
        const registerData = data as z.infer<ReturnType<typeof createRegisterSchema>>;
        await authRegister({...registerData, id: `${crypto.randomUUID()}-${Date.now().toString()}}`});
      }
      navigate('/');
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred.');
    }
  };

  const title = formType === 'login' ? t('loginTitle') : t('registerTitle');
  const subtitle = formType === 'login' ? t('loginSubtitle') : t('registerSubtitle');

  return (
    <div className="min-h-80 w-full flex bg-gray-900 text-white font-sans rounded-md">
      {/* LEFT SIDE - BRANDING & VIDEO */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-black relative overflow-hidden rounded-md">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0" src="https://assets.mixkit.co/videos/preview/mixkit-black-and-white-shot-of-a-beautiful-woman-32051-large.mp4"/>
        <div className="z-10"><h1 className="text-4xl font-black tracking-widest text-white uppercase">Tahres</h1></div>
        <div className="z-10"><p className="text-5xl font-bold text-white leading-tight max-w-lg">{t('brandSlogan')}</p><button className="mt-8 group inline-flex items-center justify-center bg-white text-black font-bold py-3 px-10 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">{t('brandCTA')}</button></div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative rounded-md">
        <div className="w-full max-w-md bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
          <AnimatePresence mode="wait">
            <motion.div key={formType} variants={formVariants} initial="hidden" animate="visible" exit="exit">
              <div className="text-center mb-12"><h2 className="text-4xl font-extrabold uppercase tracking-wider text-white">{title}</h2><p className="text-gray-400 mt-3">{subtitle}</p></div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formType === 'register' && (
                  <div>
                    <input type="text" placeholder={t('nameLabel')} {...register('name')} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 text-white p-4 outline-none transition-all duration-300"/>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                )}
                <div>
                  <input type="email" placeholder={t('emailLabel')} {...register('email')} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 text-white p-4 outline-none transition-all duration-300"/>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder={t('passwordLabel')} {...register('password')} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 text-white p-4 outline-none transition-all duration-300"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors">{showPassword ? <EyeOffIcon/> : <EyeIcon/>}</button>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {apiError && <p className="text-red-400 text-sm text-center">{apiError}</p>}

                <div className="text-right"><a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">{t('forgotPassword')}</a></div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 text-black font-bold py-4 rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
                  {isSubmitting ? '...' : (formType === 'login' ? t('loginButton') : t('registerButton'))}
                </button>

                <div className="text-center text-gray-500 text-sm flex items-center gap-4 pt-2"><hr className="flex-grow border-gray-700"/><span>{t('orContinueWith')}</span><hr className="flex-grow border-gray-700"/></div>
                <div className="flex justify-center"><button type="button" className="p-3 border-2 border-gray-700 rounded-full hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300"><GoogleIcon/></button></div>
              </form>

              <p className="text-center text-gray-400 mt-10">
                {formType === 'login' ? t('noAccountPrompt') : t('hasAccountPrompt')}{' '}
                <button onClick={() => handleFormSwitch(formType === 'login' ? 'register' : 'login')} className="text-cyan-400 hover:underline font-bold">{formType === 'login' ? t('registerLink') : t('loginLink')}</button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
