"use client"
import { useRef, useState, useEffect } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaXTwitter, FaInstagram, FaFacebook, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

interface NavbarProps {
    setFooterHidden: (hidden: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setFooterHidden }) => {
    const menuBlock = useRef<HTMLDivElement>(null);
    const toggleButton = useRef<HTMLDivElement>(null);
    const [menuHidden, setMenuhidden] = useState(true);
    const navigate = useNavigate();

    const handleScroll = (sectionId: string) => {
        navigate('/');
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleStoreClick = () => {
        navigate('/store');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    const handleVideosClick = () => {
        navigate('/videos');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    const toggleMenu = () => {
        if (!menuBlock.current) return;
        if (menuHidden) {
            menuBlock.current?.classList.remove("w-0");
            menuBlock.current?.classList.add("w-[50%]");
            setMenuhidden(false);
            setFooterHidden(true);
        } else {
            menuBlock.current?.classList.remove("w-[50%]");
            menuBlock.current?.classList.add("w-0");
            setMenuhidden(true);
            setFooterHidden(false);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuBlock.current && !menuBlock.current.contains(event.target as Node) && !toggleButton.current?.contains(event.target as Node)) {
            toggleMenu();
        }
    };

    useEffect(() => {
        if (!menuHidden) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuHidden]);

    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const updateDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        updateDarkMode();

        const observer = new MutationObserver(updateDarkMode);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav className="md:hidden top-0 left-0 z-10 p-4 m-2 relative">
                <div className="flex items-center" ref={toggleButton}>
                    <HiMiniBars3BottomRight className="text-black dark:text-white text-xl" onClick={toggleMenu} />
                    <DarkMode className="ml-4"/>
                </div>
                <div className="fixed flex flex-col text-center z-10 right-0 top-0 h-screen w-0 overflow-x-hidden transition-all duration-300 ease-in bg-white dark:bg-[#0a0a0a]" ref={menuBlock}>
                    <img src={isDarkMode ? "/dark-logo.png" : "/logo.png"} alt="Ace Studios Logo" className="w-1/2 mx-auto mt-2" />
                    <div className="flex flex-col text-center mb-4 md:mb-0">
                        <a onClick={() => handleScroll('about')} className="block mb-4 dark:text-white font-semibold cursor-pointer">About Us</a>
                        <a onClick={() => handleScroll('team')} className="block mb-4 dark:text-white font-semibold cursor-pointer">Our Team</a>
                        <a onClick={handleStoreClick} className="block mb-4 dark:text-white font-semibold cursor-pointer">Store</a> {/* Internal link */}
                        <a onClick={handleVideosClick} className="block mb-4 dark:text-white font-semibold cursor-pointer">Videos</a> {/* Internal link */}
                        <a href="mailto:example@gmail.com" className="block mb-4 dark:text-white font-semibold">Contact</a>
                        <Link to="/careers" className="block mb-4 dark:text-white">Careers</Link>
                    </div>
                    <div className="flex flex-col text-center mb-4 md:mb-0">
                        <Link to="/projects" className="block mb-4 dark:text-white">Projects</Link>
                        <Link to="/releases" className="block mb-4 dark:text-white">Upcoming Releases</Link>
                        <Link to="/awards" className="block mb-4 dark:text-white">Awards</Link>
                        <Link to="/news" className="block mb-4 dark:text-white">News</Link>
                        <Link to="/events" className="block mb-4 dark:text-white">Events</Link>
                    </div>
                    <div className="flex flex-col text-center mmb-4 md:mb-0">
                        <Link to="/privacy-policy" className="block mb-4 dark:text-white">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="block mb-4 dark:text-white">Terms of Service</Link>
                        <Link to="/cookie-policy" className="block mb-4 dark:text-white">Cookie Policy</Link>
                        <Link to="/accessibility" className="block mb-4 dark:text-white">Accessibility</Link>
                    </div>
                    <div className="mt-auto mb-10">
                        <div className="flex justify-center space-x-4 mb-6">
                            <a href="https://www.facebook.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-black dark:text-white text-xl" />
                            </a>
                            <a href="https://www.instagram.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-black dark:text-white text-xl" />
                            </a>
                            <a href="https://www.linkedin.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                                <FaLinkedinIn className="text-black dark:text-white text-xl" />
                            </a>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <a href="https://www.tiktok.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                                <FaTiktok className="text-black dark:text-white text-xl" />
                            </a>
                            <a href="https://www.twitter.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="text-black dark:text-white text-xl" />
                            </a>
                            <a href="mailto:example@gmail.com" className="dark:text-white">
                                <SiGmail className="text-black dark:text-white text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="hidden md:flex justify-between items-center p-4 bg-white dark:bg-[#0a0a0a] relative">
                <div className="flex space-x-8 ml-8">
                    <a onClick={() => handleScroll('about')} className="hover:underline underline-offset-2 hover:underline-offset-4 hover:text-gray-500 dark:text-white dark:hover:text-slate-200 cursor-pointer">About Us</a>
                    <a onClick={() => handleScroll('team')} className="hover:underline underline-offset-2 hover:underline-offset-4 hover:text-gray-500 dark:text-white dark:hover:text-slate-200 cursor-pointer">Our Team</a>
                    <a onClick={handleStoreClick} className="hover:underline underline-offset-2 hover:underline-offset-4 hover:text-gray-500 dark:text-white dark:hover:text-slate-200 cursor-pointer">Store</a> {/* Internal link */}
                    <a onClick={handleVideosClick} className="hover:underline underline-offset-2 hover:underline-offset-4 hover:text-gray-500 dark:text-white dark:hover:text-slate-200 cursor-pointer">Videos</a> {/* Internal link */}
                    <a href="mailto:example@gmail.com" className="hover:underline underline-offset-2 hover:underline-offset-4 hover:text-gray-500 dark:text-white dark:hover:text-slate-200">Contact</a>
                </div>

                <DarkMode className="ml-4"/>

                <div className="flex flex-col items-center space-y-4 fixed right-4 top-1/2 transform -translate-y-1/2 mr-5 z-50">
                    <a href="https://www.facebook.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                    <a href="https://www.instagram.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                    <a href="https://www.linkedin.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                    <a href="https://www.tiktok.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                    <a href="https://www.twitter.com" className="dark:text-white" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                    <a href="mailto:example@gmail.com" className="dark:text-white">
                        <SiGmail className="text-black dark:text-white text-2xl cursor-pointer" />
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar;