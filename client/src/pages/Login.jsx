import { useContext, useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";
import userContext from '../context/userContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Animation variants ────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "user@gmail.com", password: "User@123" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { fetchUserDetails, fetchAddToCart } = useContext(userContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(endPoints.logIn.url, data, { withCredentials: true });
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate("/");
                fetchUserDetails();
                fetchAddToCart();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error);
        } finally {
            setLoading(false);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section
            id="login"
            className="relative w-full min-h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden
                       bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100"
        >
            {/* ── Soft decorative blobs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="animate-blob absolute -top-24 -left-24 w-80 h-80
                               rounded-full bg-purple-200/60 blur-3xl" />
                <div className="animate-blob animation-delay-2000 absolute top-1/2 -right-24 w-72 h-72
                               rounded-full bg-indigo-200/60 blur-3xl" />
                <div className="animate-blob animation-delay-4000 absolute -bottom-16 left-1/3 w-64 h-64
                               rounded-full bg-violet-200/50 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto container p-5">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md mx-auto rounded-2xl p-8
                               bg-white/80 backdrop-blur-xl border border-purple-100
                               shadow-[0_8px_48px_rgba(139,92,246,0.12)]"
                >
                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-24 h-24 mx-auto rounded-full mb-5 overflow-hidden
                                   ring-4 ring-purple-300 shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                    >
                        <img src={loginIcon} className="w-full h-full object-cover" alt="login" />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-center text-2xl font-bold text-slate-800 mb-6 tracking-tight"
                    >
                        Welcome Back 👋
                    </motion.h2>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-4"
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Email */}
                        <motion.div variants={itemVariants} className="grid gap-1">
                            <label className="text-slate-600 text-sm font-semibold">Email</label>
                            <div className="auth-input bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2 transition-all duration-300">
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    id="email"
                                    placeholder="Enter email"
                                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                                />
                            </div>
                        </motion.div>

                        {/* Password */}
                        <motion.div variants={itemVariants} className="grid gap-1">
                            <label className="text-slate-600 text-sm font-semibold">Password</label>
                            <div className="auth-input bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2 transition-all duration-300">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                                />
                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="text-slate-400 hover:text-purple-500 transition-colors flex-shrink-0"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={showPassword ? 'eye' : 'eye-slash'}
                                            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-purple-500 hover:text-purple-700 w-fit ml-auto mt-1
                                           underline underline-offset-2 decoration-transparent hover:decoration-purple-500
                                           transition-all duration-200"
                            >
                                Forgot password?
                            </Link>
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(139,92,246,0.35)' }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3 px-6 rounded-xl font-semibold text-white text-sm tracking-wide
                                           bg-gradient-to-r from-purple-500 to-indigo-500
                                           hover:from-purple-600 hover:to-indigo-600
                                           disabled:opacity-60 disabled:cursor-not-allowed
                                           transition-colors duration-300 shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Logging in…
                                    </span>
                                ) : 'Login'}
                            </motion.button>
                        </motion.div>
                    </motion.form>

                    {/* Footer link */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        className="text-center text-sm text-slate-500 mt-6"
                    >
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-purple-500 hover:text-purple-700 font-semibold
                                       underline underline-offset-2 decoration-transparent hover:decoration-purple-500
                                       transition-all duration-200"
                        >
                            Sign up
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Login;