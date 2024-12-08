import  { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpForm } from './components/auth/SignUpForm';

function App() {
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="flex rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 text-center font-medium transition-colors ${
              activeForm === 'login'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium transition-colors ${
              activeForm === 'signup'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveForm('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {activeForm === 'login' ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}

export default App;