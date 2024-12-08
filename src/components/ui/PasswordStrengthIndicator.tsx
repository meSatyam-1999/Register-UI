import React from 'react';
import { calculatePasswordStrength, getPasswordStrengthColor } from '../../utils/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const strengthColor = getPasswordStrengthColor(strength);
  
  return (
    <div className="mt-1" role="progressbar" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={5}>
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-colors ${
              index < strength ? strengthColor : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-1">
        {strength === 0 && 'Very weak'}
        {strength === 1 && 'Weak'}
        {strength === 2 && 'Fair'}
        {strength === 3 && 'Good'}
        {strength === 4 && 'Strong'}
        {strength === 5 && 'Very strong'}
      </p>
    </div>
  );
};