// src/context/GenerateContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,   // ← type keyword add kar diya
} from "react";

export interface GeneratedItem {
  id: number;
  title: string;
  image: string;
  style: string;
  ratio: string;
  color: string;
  date?: string;
  prompt?: string;
}

interface GenerateContextType {
  generated: GeneratedItem[];
  addGenerated: (item: Omit<GeneratedItem, "id" | "date">) => void;
  clearAll: () => void;
  deleteById: (id: number) => void;
}

const GenerateContext = createContext<GenerateContextType | undefined>(undefined);

const STORAGE_KEY = "himanshu-ai-thumbnails-v1";

export const GenerateProvider = ({ children }: { children: ReactNode }) => {
  const [generated, setGenerated] = useState<GeneratedItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to load saved thumbnails", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generated));
    } catch (err) {
      console.error("Failed to save thumbnails", err);
    }
  }, [generated]);

  const addGenerated = (newItem: Omit<GeneratedItem, "id" | "date">) => {
    setGenerated((prev) => {
      const now = new Date();
      const dateStr = now.toLocaleString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const entry: GeneratedItem = {
        ...newItem,
        id: Date.now() + Math.random(),
        date: dateStr,
      };

      return [entry, ...prev]; // newest first
    });
  };

  const deleteById = (id: number) => {
    setGenerated((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Delete ALL generated thumbnails?")) {
      setGenerated([]);
    }
  };

  return (
    <GenerateContext.Provider
      value={{ generated, addGenerated, clearAll, deleteById }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export const useGenerate = () => {
  const context = useContext(GenerateContext);
  if (!context) {
    throw new Error("useGenerate must be used inside GenerateProvider");
  }
  return context;
};