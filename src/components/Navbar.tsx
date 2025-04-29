
import React, { useState } from 'react';
import { Menu, X, Code, BookOpen, Brain, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dsablue/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-dsapurple font-bold text-xl flex items-center">
              <Code className="mr-2" size={24} />
              DSA Master
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
                <Home className="inline-block mr-1" size={16} />
                Home
              </Link>
              <Link to="/topics" className={`nav-link ${isActive('/topics') ? 'nav-link-active' : ''}`}>
                <BookOpen className="inline-block mr-1" size={16} />
                Topics
              </Link>
              <Link to="/code-editor" className={`nav-link ${isActive('/code-editor') ? 'nav-link-active' : ''}`}>
                <Code className="inline-block mr-1" size={16} />
                Code Editor
              </Link>
              <Link to="/ai-assistant" className={`nav-link ${isActive('/ai-assistant') ? 'nav-link-active' : ''}`}>
                <Brain className="inline-block mr-1" size={16} />
                AI Assistant
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dsablue/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`nav-link block ${isActive('/') ? 'nav-link-active' : ''}`}>
              <Home className="inline-block mr-2" size={16} />
              Home
            </Link>
            <Link to="/topics" className={`nav-link block ${isActive('/topics') ? 'nav-link-active' : ''}`}>
              <BookOpen className="inline-block mr-2" size={16} />
              Topics
            </Link>
            <Link to="/code-editor" className={`nav-link block ${isActive('/code-editor') ? 'nav-link-active' : ''}`}>
              <Code className="inline-block mr-2" size={16} />
              Code Editor
            </Link>
            <Link to="/ai-assistant" className={`nav-link block ${isActive('/ai-assistant') ? 'nav-link-active' : ''}`}>
              <Brain className="inline-block mr-2" size={16} />
              AI Assistant
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
