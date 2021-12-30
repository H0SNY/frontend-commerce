import { useState } from 'react';
import { motion } from 'framer-motion';
import { signUp } from '../connections/user';
import { useCookies } from 'react-cookie';
import {Link , useNavigate} from 'react-router-dom'

export default function Signup({onSignin}) {
	const [cookies, setCookie] = useCookies(['auth', 'user', 'token']);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		valid: false,
		firstname: { value: '', valid: false },
		lastname: { value: '', valid: false },
		email: { value: '', valid: false },
		password: { value: '', valid: false },
		rePassword: { value: '', valid: false },
	});
	const {auth} = cookies;
	if(auth) navigate('/')
	const [message, setMessage] = useState(false);
	const handleFirstname = (e) => {
		const value = e.target.value;
		const valid = e.target.value.length > 3;
		const allValid = valid && form.password.valid && form.lastname.valid && form.email.valid && form.rePassword.valid;
		setForm({ ...form, firstname: { value: value, valid: valid }, valid: allValid });
	};

	const handleLastname = (e) => {
		const value = e.target.value;
		const valid = e.target.value.length > 3;
		const allValid = valid && form.password.valid  && form.firstname.valid && form.email.valid && form.rePassword.valid;
		setForm({ ...form, lastname: { value: value, valid: valid }, valid: allValid });
	};

	const handleEmail = (e) => {
		const value = e.target.value;
		const valid = e.target.value.includes('@');
		const allValid = valid && form.password.valid  && form.lastname.valid && form.firstname.valid && form.rePassword.valid;
		setForm({ ...form, email: { value: value, valid: valid }, valid: allValid });
	};

	const handlePassword = (e) => {
		const valid = (e.target.value.length > 6);
		const value = e.target.value;
		const allValid = valid && form.firstname.valid  && form.lastname.valid && form.email.valid && form.rePassword.valid && (form.password.value === form.rePassword.value);
		setForm({ ...form, password: { value: value, valid: valid }, valid: allValid });
	};
	const handleRePassword = (e) => {
		const valid = (e.target.value.length > 6) && (e.target.value === form.password.value);
		const value = e.target.value;
		const allValid = valid && form.email.valid  && form.lastname.valid && form.email.valid && form.firstname.valid;
		setForm({ ...form, rePassword: { value: value, valid: valid }, valid: allValid });
	};
	const handleSignUp = async () => {
		if (!form.valid) {
			setMessage('Please Enter Valid Credentials');
			return;
		}
		const { valid, token, user } = await signUp(form.firstname.value,form.lastname.value , form.email.value ,  form.password.value);
		if (!valid) {
			setMessage('Signup Failed , probably incorrect email address');
			return;
		}
		onSignin(user , token);
		setMessage(false);
	};
	/* eslint-disable */
	return (
		<motion.div animate={{ opacity: [0, 1], y: [-300, 0] }} transition={{ duration: 1 }} accessKey="login" className="flex flex-row justify-center mt-12 text-white relative z-30">
			<div accessKey="signup" className="flex flex-col items-center pl-5 w-72 sm:w-96 bg-indigo-600 rounded-lg">
				<div accessKey="signup" className="flex flex-col justify-center my-1 items-center">
					<h3 accessKey="signup" aria-describedby="login">
						Signup
					</h3>
				</div>
				<div accessKey="signup" className="flex flex-row my-1 justify-evenly w-64 text-sm">
					<div accessKey="signup" className="basis-4/12">
						<h4 accessKey="signup" className="mr-3">
							firstname
						</h4>
					</div>
					<div accessKey="signup" className="basis-8/12">
						<input onChange={handleFirstname} accessKey="signup" className="w-40 rounded-md text-black pl-1" type="text" />
					</div>
				</div>
				<div accessKey="signup" className="flex flex-row flex-none my-1 justify-evenly text-sm w-64">
					<div accessKey="signup" className="basis-4/12">
						<h4 accessKey="signup" className="mr-3">
							lastname
						</h4>
					</div>
					<div accessKey="signup" className="basis-8/12">
						<input onChange={handleLastname} accessKey="signup" className="w-40 rounded-md text-black pl-1" type="text" />
					</div>
				</div>
				<div accessKey="signup" className="flex flex-row flex-none my-1 justify-evenly text-sm w-64">
					<div accessKey="signup" className="basis-4/12">
						<h4 accessKey="signup" className="mr-3">
							email
						</h4>
					</div>
					<div accessKey="signup" className="basis-8/12">
						<input onChange={handleEmail} accessKey="signup" className="w-40 rounded-md text-black pl-1" type="email" />
					</div>
				</div>
				<div accessKey="signup" className="flex flex-row flex-none my-1 justify-evenly text-sm w-64">
					<div accessKey="signup" className="basis-4/12">
						<h4 accessKey="signup" className="mr-3">
							password
						</h4>
					</div>
					<div accessKey="signup" className="basis-8/12">
						<input onChange={handlePassword} accessKey="signup" className="w-40 rounded-md text-black pl-1" type="password" />
					</div>
				</div>
				<div accessKey="signup" className="flex flex-row flex-none my-1 justify-evenly text-sm w-64">
					<div accessKey="signup" className="basis-4/12">
						<h4 accessKey="signup" className="mr-3">
							re-password
						</h4>
					</div>
					<div accessKey="signup" className="basis-8/12">
						<input onChange={handleRePassword} accessKey="signup" className="w-40 rounded-md text-black pl-1" type="password" />
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
						<Link to = 'login' accessKey="login" className="bg-green-600 p-2 rounded-lg hover:bg-green-700">
							<h4 accessKey="login">Login</h4>
						</Link>
					</div>
					<div accessKey="login" className="flex flex-col justify-center items-center">
						<button onClick={handleSignUp} accessKey="login" className="bg-green-600 p-2 rounded-lg hover:bg-green-700">
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
