import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';


function LoginModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(formData))

        // Call onSubmit callback
        onSubmit(formData)

        // Show success alert
        Swal.fire({
            title: 'Login Successful 🎉',
            text: `Welcome, ${formData.name}!`,
            icon: 'success',
            confirmButtonColor: '#84cc16', // lime-500
            confirmButtonText: 'Continue',
            timer: 2000,
            showConfirmButton: false,
        })

        // Reset form and close modal
        setFormData({ name: '', email: '', password: '' })
        setErrors({})
        setTimeout(() => {
            onClose()
        }, 200)
    }

    if (!isOpen) return null

    return (
        <>
            {/* Dark overlay backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white shadow-2xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-900">Login</h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-lg p-1 transition hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-3 text-sm transition focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-100"
                                autoFocus
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email ID
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-3 text-sm transition focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-100"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className="w-full cursor-text rounded-lg border border-gray-300 px-4 py-3 text-sm transition focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-100"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full rounded-lg bg-lime-300 py-3 font-semibold text-gray-900 transition hover:bg-lime-400 active:scale-95 mt-6"
                        >
                            Login
                        </button>
                    </form>

                    {/* Modal Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-2xl">
                        <p className="text-center text-xs text-gray-600">
                            Demo login - All fields are required
                        </p>
                    </div>
                </div>
            </div>

            {/* Add fade-in animation */}
            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </>
    )
}

export default LoginModal
