import { codeToHtml } from "shiki";

interface HighlightOptions {
  lang?: string;
  theme?: "light" | "dark";
}

const DEFAULT_OPTIONS: Required<HighlightOptions> = {
  lang: "tsx",
  theme: "github-dark",
};

export async function highlightCode(
  code: string,
  options: HighlightOptions = {}
): Promise<string> {
  const { lang, theme } = { ...DEFAULT_OPTIONS, ...options };
  
  return codeToHtml(code, {
    lang,
    themes: {
      light: theme === "light" ? "github-light" : "github-light",
      dark: theme === "dark" ? "github-dark" : "github-dark",
    },
    defaultColor: false,
  });
}
