import React, { useState } from 'react'
import EmailSuccess from '../cards/EmailSuccess';
import User from "../../data/user.json";

interface ErrorInterface {
    nameError: boolean,
    emailError: boolean,
    emailErrorMessage: string
    messageError: boolean,
}

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<ErrorInterface>({ nameError: false, emailError: false, emailErrorMessage: '', messageError: false })
    const [isSucess, setIsSucess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            setError(prev => ({ ...prev, nameError: true }))
            return;
        }
        if (!email.trim()) {
            setError(prev => ({ ...prev, emailError: true, emailErrorMessage: "This Field is required" }))
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(prev => ({ ...prev, emailError: true, emailErrorMessage: "Please enter a valid email address" }))
            return;
        }
        if (!message.trim()) {
            setError(prev => ({ ...prev, messageError: true }))
            return;
        }

        setIsSubmitting(true);
        fetch(import.meta.env.VITE_BACKEND_EMAIL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        }).then(res => {
            if (!res.ok) throw new Error('Something wrong happened!');
            return res.json();
        }).then(data => {
            console.log(data);
            setEmail('');
            setName('');
            setMessage('');
            setIsSucess(true);
            setIsSubmitting(false);
            setTimeout(() => setIsSucess(false), 12000)
        }).catch(error => {
            console.log(error);
            setIsSubmitting(false);
        })
    };

    return (
        <section className=" bg-[#f0f0f0] text-neutral-800 md:px-16 md:py-20 sm:p-12 p-6 pb-12 dark:bg-[#1e1e1e] dark:text-[#f8f8f8] transition-colors" id="contact">
            <h2 className="text-4xl md:text-5xl cabinet text-start font-bold">Get In Touch</h2>

            <div className="h-1 w-36 md:w-48  bg-neutral-900 rounded-full " />

            <div className="w-full mx-auto grid md:grid-cols-[1fr_1.5fr] gap-4 lg:gap-24 items-start">

                {/* Contact Informantion */}
                <div className="flex-1">

                    <p className="text-lg my-8 text-neutral-600 leading-relaxed">Ready to start your next project? I'd love to hear about your ideas and discuss how we can bring them to life.</p>

                    {/* email */}
                    <a href={`mailto:${User.contact.email}`} className="flex items-center mt-6 space-x-4 hover:translate-x-1 transition-all duration-200 rounded-lg">
                        <div className=" bg-neutral-800 p-2 rounded-lg text-white items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth="2">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-lg font-medium">Email</p>
                            <p>{User.contact.email}</p>
                        </div>
                    </a>

                    {/* Phone */}

                    <a href={`tel:${User.contact.phone}`} className="flex items-center mt-6 space-x-4 hover:translate-x-1 transition-all duration-200 rounded-lg">
                        <div className=" bg-neutral-800 p-2 rounded-lg text-white items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                </path>
                            </svg>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-lg font-medium">Phone</p>
                            <p>{User.contact.phone}</p>
                        </div>
                    </a>

                    {/* Location */}

                    <div className="flex items-center mt-6 space-x-4">
                        <div className=" bg-neutral-800 p-2 rounded-lg text-white items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-lg font-medium">Location</p>
                            <p>{User.location}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Connect With Me</h3>
                        <div className="flex mt-4 space-x-4">

                            <a href={User.social.github.url} rel="noopener noreferrer" aria-label="Visit Varoon Kumar's Github profile" target="_blank" className="p-3 hover:scale-110 active:bg-transparent dark:hover:text-white dark:active:text-white bg-neutral-200 text-[#3d3d3d] dark:bg-gray-50 rounded-full">
                                {/* github */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path
                                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                    </path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </a>

                            <a href={User.social.linkedin} rel="noopener noreferrer" aria-label="Visit Varoon Kumar's Linkedin profile" target="_blank" className="p-3 hover:scale-110 active:bg-transparent bg-neutral-200 dark:hover:text-white dark:active:text-white dark:bg-neutral-50 text-[#3d3d3d] rounded-full">

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>

                            <a href={User.contact.whatsapp} rel="noopener noreferrer" aria-label="Text Varoon Kumar on Whatsapp" target="_blank" className="p-3 hover:scale-110 active:bg-transparent bg-neutral-200 dark:hover:text-white dark:active:text-white dark:bg-neutral-50 text-[#3d3d3d] rounded-full">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                >
                                    <path d="M12.04 2C6.55 2 2.1 6.46 2.1 11.95c0 1.98.52 3.84 1.51 5.48L2 22l4.71-1.55a9.9 9.9 0 0 0 5.33 1.55h.01c5.49 0 9.95-4.46 9.95-9.95C22 6.46 17.54 2 12.04 2zm5.79 14.38c-.24.67-1.41 1.29-1.95 1.35-.5.06-1.12.08-1.8-.14-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.93-4.36-.13-.18-1.17-1.55-1.17-2.96s.74-2.1 1-2.39c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.17.01.4-.06.63.48.24.58.82 2 .89 2.14.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.3.36-.43.48-.14.14-.28.29-.12.57.17.29.73 1.2 1.56 1.95 1.07.95 1.97 1.25 2.26 1.39.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.7-.17 1.37z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

                {/* Contact form */}
                <form onSubmit={e => formSubmit(e)} className="flex flex-col w-full mt-8 md:mt-0">
                    <h3 className="text-2xl font-semibold mb-8 text-center md:text-left text-gray-800 dark:text-gray-100">Send Me a Message</h3>
                    {isSucess && <div className="mb-6"><EmailSuccess /></div>}

                    <div className="flex flex-col w-full gap-10">
                        {/* Name */}
                        <div className="relative ">
                            <label htmlFor="name" className="absolute -top-3 left-4 bg-[#f0f0f0] dark:bg-[#1e1e1e] px-2 text-sm font-medium text-gray-500 dark:text-gray-400 z-10 transition-colors">Name</label>
                            <input value={name} onChange={e => {
                                setName(e.target.value)
                                if (error.nameError) setError(prev => ({ ...prev, nameError: false }))
                            }} id="name" autoComplete="name"
                                className={`w-full bg-transparent border-2 ${error.nameError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-2xl p-5 outline-none focus:border-gray-800 dark:focus:border-gray-400 transition-colors text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                                placeholder="Enter your full name" />
                            {error.nameError && <p className="text-red-500 mt-1 text-sm absolute -bottom-6 left-2">This field is required</p>}
                        </div>

                        {/* Email */}
                        <div className="relative ">
                            <label htmlFor="email" className="absolute -top-3 left-4 bg-[#f0f0f0] dark:bg-[#1e1e1e] px-2 text-sm font-medium text-gray-500 dark:text-gray-400 z-10 transition-colors">Mail</label>
                            <input value={email} onChange={e => {
                                setEmail(e.target.value)
                                if (error.emailError) setError(prev => ({ ...prev, emailError: false }))
                            }} id="email" autoComplete="email"
                                className={`w-full bg-transparent border-2 ${error.emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-2xl p-5 outline-none focus:border-gray-800 dark:focus:border-gray-400 transition-colors text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                                placeholder="Enter your email" />
                            {error.emailError && <p className="text-red-500 mt-1 text-sm absolute -bottom-6 left-2">{error.emailErrorMessage}</p>}
                        </div>

                        {/* Project / Message */}
                        <div className="relative ">
                            <label htmlFor="message" className="absolute -top-3 left-4 bg-[#f0f0f0] dark:bg-[#1e1e1e] px-2 text-sm font-medium text-gray-500 dark:text-gray-400 z-10 transition-colors">Message</label>
                            <textarea value={message} onChange={e => {
                                setMessage(e.target.value)
                                if (error.messageError) setError(prev => ({ ...prev, messageError: false }))
                            }} id="message"
                                className={`w-full bg-transparent border-2 ${error.messageError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-2xl p-5 outline-none focus:border-gray-800 dark:focus:border-gray-400 transition-colors resize-none h-28 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                                placeholder="Hey Varoon, I'd like to discuss a project..."></textarea>
                            {error.messageError && <p className="text-red-500 mt-1 text-sm absolute -bottom-6 left-2">This field is required</p>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="self-start w-full active:scale-[0.98] hover:opacity-90 hover:scale-105 font-medium bg-neutral-800 text-white dark:bg-white dark:text-neutral-800 px-8 py-5 rounded-2xl flex items-center justify-center transition-all shadow-md group">
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {/* Send Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}