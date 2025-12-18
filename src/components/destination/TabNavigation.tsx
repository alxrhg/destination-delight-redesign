import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update indicator position
    const activeButton = document.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
    if (activeButton && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeButton.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeButton.offsetLeft}px`;
    }
  }, [activeTab]);

  const scrollToSection = (tabId: string) => {
    onTabChange(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        isSticky
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="relative flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
          {/* Active indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-smooth"
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
