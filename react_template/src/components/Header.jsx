import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogContext } from '../context/BlogContext';
import { projects, experience as expData } from '../data/portfolioData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { posts = [] } = useContext(BlogContext) || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Temporarily disable smooth scrolling for instant navigation
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Get the element's position and account for header height
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Re-enable smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 10);
      
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <div className="text-2xl font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Raj</span> 
              <span className="group-hover:text-blue-100 transition-colors duration-300">Agarwal</span>
            </div>
            
            {/* Pop-up card */}
            <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 shadow-2xl w-[280px]">
                {/* Arrow pointer */}
                <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-900/95 border-l border-t border-blue-400/30 rotate-45"></div>
                
                <div className="relative z-10 bg-gray-900/95 rounded-lg p-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      RA
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Raj Agarwal</h3>
                      <p className="text-blue-400 text-sm">CSE Core Student</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Available for opportunities
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">📍</span>
                      India
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">💼</span>
                      Web Developer & Open Source Contributor
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex space-x-2">
                      <div className="flex-1 text-center">
                        <div className="text-blue-400 font-semibold">{projects.length}+</div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-purple-400 font-semibold">{expData.filter(exp => exp.type === 'Internship').length}+</div>
                        <div className="text-xs text-gray-400">Experiences</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-green-400 font-semibold">{posts.length}+</div>
                        <div className="text-xs text-gray-400">Posts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group px-4 py-2 text-gray-300 font-medium transition-all duration-300 ease-out hover:text-white"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-95 group-hover:scale-100"></div>
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/30 transition-all duration-300 ease-out"></div>
                
                {/* Text with subtle glow */}
                <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300">
                  {item.label}
                </span>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
                
                {/* Subtle particle effect */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2 group-hover:animate-ping transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}></span>
              <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-white block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;