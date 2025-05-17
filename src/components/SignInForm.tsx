import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Link } from 'react-router-dom';

// Define validation schema
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const { signin, isLoading } = useAuth();
  const [form, setForm] = useState<SignInFormValues>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof SignInFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    try {
      signInSchema.parse(form);
      // If validation passes, submit the form
      await signin(form.email, form.password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to form errors
        const formErrors: Partial<SignInFormValues> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof SignInFormValues] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        fullWidth
      />
      <Button type="submit" isLoading={isLoading} fullWidth>
        Sign In
      </Button>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};