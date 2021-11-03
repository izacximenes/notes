
import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import api from '../services/api';

const Register: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    async function signUp(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        try {
            await api.post('register', {
                name,
                email,
                password
            })
            history.push('/login');
            toast("Account created with success!", {
                type: 'success',
                autoClose: 5000
            })
           
        } catch (error) {
            toast("Check your infos", {
                type: 'error',
                autoClose: 5000
            })
        } finally {
            setLoading(false)
        }

    }
    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <ToastContainer />
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center flex-row-reverse">

                <div className="w-full h-100">


                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Create your account</h1>

                    <form onSubmit={signUp} className="mt-6" >
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input type="text" onChange={ev => setName(ev.target.value)} placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" onChange={ev => setEmail(ev.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input type="password" onChange={ev => setPassword(ev.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none" required />
                        </div>



                        <button disabled={loading} type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6">{ loading ? 'Sign Up...' : 'Sign Up' }</button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />


                    <p className="mt-8">do you have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Sign in</Link></p>


                </div>
            </div>

        </section>
    );
}

export default Register;