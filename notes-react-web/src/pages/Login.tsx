
import { FC, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../context/user';
import api from '../services/api';
import { login, updateUserInfo } from '../services/auth';

interface ResponseToken {
    type: string,
    token: string
}


const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { setState: setUserState } = useContext(UserContext);


    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
            const response = await api.post<ResponseToken>('/login', {
                email,
                password
            })

            login(response.data.token);

            const userInfo = await updateUserInfo();

            if (userInfo) {
                setUserState({
                    name: userInfo.name,
                    email: userInfo.email
                })
            }

            history.push('/');
        } catch (error) {
            toast("Invalid login!", {
                type: 'error'
            })
        }

    }


    return (
        <section className="flex flex-col md:flex-row h-screen items-center">

            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">

                <div className="w-full h-100">


                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                    <form className="mt-6" action="#" onSubmit={handleLogin} method="POST">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none" required />
                        </div>



                        <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6">Log In</button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />


                    <p className="mt-8">Need an account? <Link to="/register" className="text-blue-500 hover:text-blue-700 font-semibold">Create an
                        account</Link></p>


                </div>
            </div>

        </section>
    );
}

export default Login;