import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';
import Footer from '../components/Footer'; 

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: 'kimocks20@gmail.com',
      password: '12345678',
    },
  });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              <span className="text-yellow-500">BAT</span> PANIC
            </h1>
            <p className="mt-2 text-gray-600">Commissioner Gordon Access</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="gordon@gcpd.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">Email is required.</p>
                )}
              </div>

              <div>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">Password is required.</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
              >
                ACCESS BAT SIGNAL
              </button>
            </div>
          </form>
        </div>
      </div>
       <Footer /> 
    </div>
  );
}
