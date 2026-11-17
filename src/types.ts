//videographer-portfolio-backend\src\types.ts
// Услуга (таблица services)
export interface Service {
  id: number;
  name: string;
  price: number;
  description: string | null;
  duration: string | null;
  features: string[];
}

// Работа из портфолио (таблица portfolio_items)
export interface PortfolioItem {
  id: number;
  title: string;
  category: "wedding" | "corporate" | "event" | "music";
  description: string | null;
  image: string | null;
  video_url: string | null;
  featured: boolean;
}

// Обёртки для API-ответов
export interface ApiResponse<T> {
  success: boolean;
  data: T[];
}
