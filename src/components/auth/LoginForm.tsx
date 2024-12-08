import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { LoginFormValues } from '../../types/auth';
import { LogIn } from 'lucide-react';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/storage';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  rememberMe: Yup.boolean(),
});

const initialValues: LoginFormValues = {
  email: getFromLocalStorage('rememberedEmail') || '',
  password: '',
  rememberMe: Boolean(getFromLocalStorage('rememberedEmail')),
};

export const LoginForm = () => {
  const handleSubmit = (values: LoginFormValues) => {
    if (values.rememberMe) {
      saveToLocalStorage('rememberedEmail', values.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    console.log('Login values:', values);
    alert('Login Successful!');
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md" role="form" aria-label="Login form">
      <div className="flex items-center justify-center mb-8">
        <LogIn className="w-8 h-8 text-indigo-600" aria-hidden="true" />
        <h2 className="ml-2 text-2xl font-bold text-gray-900">Login</h2>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, getFieldProps, values, setFieldValue }) => (
          <Form className="space-y-6">
            <Input
              label="Email"
              type="email"
              error={touched.email && errors.email}
              aria-label="Email address"
              {...getFieldProps('email')}
            />

            <Input
              label="Password"
              type="password"
              error={touched.password && errors.password}
              aria-label="Password"
              {...getFieldProps('password')}
            />

            <Checkbox
              id="remember-me"
              label="Remember me"
              checked={values.rememberMe}
              onChange={(checked) => setFieldValue('rememberMe', checked)}
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm transition-colors"
              aria-label="Sign in"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};