// Пока заглушка — настройки можно хранить в JSON или отдельной таблице
export const getSettings = async (req: any, res: any) => {
  res.json({
    theme: "light",
    siteTitle: "Videographer Portfolio",
    contactEmail: "hello@example.com",
  });
};

export const updateSettings = async (req: any, res: any) => {
  res.json({ message: "Настройки обновлены", ...req.body });
};
