import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../ui/Input';
import { SignUpFormValues } from '../../types/auth';
import { UserPlus } from 'lucide-react';
import { PasswordStrengthIndicator } from '../ui/PasswordStrengthIndicator';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const initialValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const handleSubmit = (values: SignUpFormValues) => {
    console.log('Sign up values:', values);
    alert('Sign Up Successful!');
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" role="form" aria-label="Sign up form">
      <div className="flex items-center justify-center mb-8">
        <UserPlus className="w-8 h-8 text-indigo-600" aria-hidden="true" />
        <h2 className="ml-2 text-2xl font-bold text-gray-900">Sign Up</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, getFieldProps, values }) => (
          <Form className="space-y-6">
            <Input
              label="Name"
              type="text"
              error={touched.name && errors.name}
              aria-label="Full name"
              {...getFieldProps('name')}
            />

            <Input
              label="Email"
              type="email"
              error={touched.email && errors.email}
              aria-label="Email address"
              {...getFieldProps('email')}
            />

            <div>
              <Input
                label="Password"
                type="password"
                error={touched.password && errors.password}
                aria-label="Password"
                {...getFieldProps('password')}
              />
              <PasswordStrengthIndicator password={values.password} />
            </div>

            <Input
              label="Confirm Password"
              type="password"
              error={touched.confirmPassword && errors.confirmPassword}
              aria-label="Confirm password"
              {...getFieldProps('confirmPassword')}
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm transition-colors"
              aria-label="Create account"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};