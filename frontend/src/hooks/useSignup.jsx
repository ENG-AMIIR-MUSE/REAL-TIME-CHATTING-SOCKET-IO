import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../components/context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setUserAuth } = useUser();
	console.log(setUserAuth)

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        console.log('hello')
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password,confirmPassword,gender,fullName}),
			});
          
			const data = await res.json();
        
			console.log(data)

			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setUserAuth(data);
			toast.success('User Registered Successfully')
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if ( !username || !password  || !confirmPassword ||  !fullName || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
		console.log('data......',password)
	if (password !=  confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}