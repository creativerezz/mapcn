import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "./ui/kbd";
import { Moon, Sun } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const MOBILE_BREAKPOINT = 768;
const THEME_KEYBOARD_SHORTCUT = "t";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if ((e.key === THEME_KEYBOARD_SHORTCUT || e.key === THEME_KEYBOARD_SHORTCUT.toUpperCase()) && 
          !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  if (!mounted) {
    return <Skeleton className="size-8" />;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={toggleTheme}
          variant="ghost"
          aria-label="Toggle theme"
          size="icon-sm"
        >
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-2 pr-1">
        Toggle Theme <Kbd>T</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}
