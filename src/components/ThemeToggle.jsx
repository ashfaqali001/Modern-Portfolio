import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-5 z-50 p-2 transition-all duration-300",
        "right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16", // Closer to right edge
        "hover:scale-110 active:scale-95", // Simple hover effects
        "focus:outline-none" // Clean focus state
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 md:h-7 md:w-7 text-blue-600 dark:text-blue-400" />
      )}
    </button>
  );
};