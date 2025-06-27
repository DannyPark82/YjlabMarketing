import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 backdrop-blur-sm shadow-sm' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-black text-2xl text-gray-900">
            YJLAB
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              소개
            </button>
            <button 
              onClick={() => scrollToSection('achievements')} 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              실적
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              서비스
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              문의
            </button>
            {isAuthenticated && (
              <a href="/admin" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                관리자
              </a>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" asChild>
                <a href="/api/logout">로그아웃</a>
              </Button>
            ) : (
              <Button asChild>
                <a href="/api/login">관리자 로그인</a>
              </Button>
            )}
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
              >
                소개
              </button>
              <button 
                onClick={() => scrollToSection('achievements')}
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
              >
                실적
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
              >
                서비스
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
              >
                문의
              </button>
              {isAuthenticated ? (
                <>
                  <a href="/admin" className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium">
                    관리자
                  </a>
                  <a href="/api/logout" className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium">
                    로그아웃
                  </a>
                </>
              ) : (
                <a href="/api/login" className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium">
                  관리자 로그인
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
