import { useState } from 'react';
import { motion } from 'framer-motion';
import { login } from '../connections/user';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Login({ onSignin }) {
	const [cookies] = useCookies(['auth', 'user', 'token']);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		valid: false,
		email: { value: '', valid: false },
		password: { value: '', valid: false },
	});
	const { auth } = cookies;
	if (auth) navigate('/');
	const [message, setMessage] = useState(false);
	const handleEmail = (e) => {
		const value = e.target.value;
		const valid = e.target.value.includes('@');
		const allValid = valid && form.password.valid;
		setForm({ ...form, email: { value: value, valid: valid }, valid: allValid });
	};

	const handlePassword = (e) => {
		const valid = e.target.value.length > 6;
		const value = e.target.value;
		const allValid = valid && form.email.valid;
		setForm({ ...form, password: { value: value, valid: valid }, valid: allValid });
	};
	const handleLogin = async () => {
		if (!form.valid) {
			setMessage('Please Enter Valid Credentials');
			return;
		}
		const { valid, token, user } = await login(form.email.value, form.password.value);
		if (!valid) {
			setMessage('Incorrect Credentials');
			return;
		}
		navigate('/');
		onSignin(user, token);
		setMessage(false);
	};
	/* eslint-disable */
	return (
		<motion.div animate={{ opacity: [0, 1], y: [-300, 0] }} transition={{ duration: 1 }} accessKey="login" className="flex flex-row justify-center mt-12 text-white relative z-30">
			<div accessKey="login" className="flex flex-col items-center pl-5 w-72 sm:w-96 bg-indigo-600 rounded-lg">
				<div accessKey="login" className="flex flex-col justify-center my-1 items-center">
					<h3 accessKey="login" aria-describedby="login">
						Login
					</h3>
				</div>
				<div accessKey="login" className="flex flex-row my-1 justify-evenly w-64 text-sm">
					<div accessKey="login" className="basis-4/12">
						<h4 accessKey="login" className="mr-3">
							Email
						</h4>
					</div>
					<div accessKey="login" className="basis-8/12">
						<input onChange={handleEmail} accessKey="login" className="w-40 rounded-md text-black pl-1" type="text" />
					</div>
				</div>
				<div accessKey="login" className="flex flex-row flex-none my-1 justify-evenly text-sm w-64">
					<div accessKey="login" className="basis-4/12">
						<h4 accessKey="login" className="mr-3">
							Password
						</h4>
					</div>
					<div accessKey="login" className="basis-8/12">
						<input onChange={handlePassword} accessKey="login" className="w-40 rounded-md text-black pl-1" type="password" />
					</div>
				</div>
				{message ? (
					<div>
						<h6>{message}</h6>
					</div>
				) : (
					''
				)}
				<div accessKey="login" className="flex flex-row justify-center my-5">
					<div accessKey="login" className="flex flex-col justify-center items-center mr-5">
						<button onClick={handleLogin} accessKey="login" className="bg-green-600 p-2 rounded-lg hover:bg-green-700">
							<h4 accessKey="login">Login</h4>
						</button>
					</div>
					<div accessKey="login" className="flex flex-col justify-center items-center">
						<button accessKey="login" className="bg-green-600 p-2 rounded-lg hover:bg-green-700">
							<h4 accessKey="login" key="login">
								SignUp
							</h4>
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
