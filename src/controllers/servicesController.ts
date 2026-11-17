// videographer-portfolio-backend/src/controllers/servicesController.ts
import { Request, Response } from "express";
import { pool } from "../database/pool";

/**
 * GET /api/v1/services
 * Возвращает список всех услуг
 */
export const getServices = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Ошибка при получении списка услуг:", err);
    res.status(500).json({ error: "Не удалось получить список услуг" });
  }
};

/**
 * POST /api/v1/services
 * Создает новую услугу
 */
export const createService = async (req: Request, res: Response) => {
  const { name, price, description, duration, features } = req.body;

  // Базовая валидация на бэкенде
  if (!name || typeof price !== "number") {
    return res.status(400).json({
      error: "Обязательны поля: name (строка) и price (число)",
    });
  }

  // Самое важное: превращаем массив в JSON-строку для колонки типа json
  let featuresToSave: string | null = null;
  if (Array.isArray(features)) {
    featuresToSave = JSON.stringify(features);
  } else if (typeof features === "string") {
    // Если вдруг фронтенд уже присылает JSON-строку — проверяем её валидность
    try {
      JSON.parse(features);
      featuresToSave = features;
    } catch (e) {
      return res
        .status(400)
        .json({ error: "Поле features содержит невалидный JSON." });
    }
  }

  try {
    const result = await pool.query(
      `INSERT INTO services (name, price, description, duration, features)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, description || null, duration || null, featuresToSave],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка при создании услуги:", err);
    res.status(500).json({ error: "Не удалось создать услугу" });
  }
};

/**
 * PUT /api/v1/services/:id
 * Обновляет существующую услугу
 */
export const updateService = async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID должен быть числом" });
  }

  const { name, price, description, duration, features } = req.body;

  if (!name || typeof price !== "number") {
    return res.status(400).json({
      error: "Для обновления обязательны name и price",
    });
  }

  // Аналогично: превращаем массив в JSON-строку
  let featuresToSave: string | null = null;
  if (Array.isArray(features)) {
    featuresToSave = JSON.stringify(features);
  } else if (typeof features === "string") {
    try {
      JSON.parse(features);
      featuresToSave = features;
    } catch (e) {
      return res
        .status(400)
        .json({ error: "Поле features содержит невалидный JSON." });
    }
  }

  try {
    const result = await pool.query(
      `UPDATE services
       SET name = $1, price = $2, description = $3, duration = $4, features = $5
       WHERE id = $6 RETURNING *`,
      [name, price, description || null, duration || null, featuresToSave, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Услуга с ID ${id} не найдена` });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка при обновлении услуги:", err);
    res.status(500).json({ error: "Не удалось обновить услугу" });
  }
};

/**
 * DELETE /api/v1/services/:id
 * Удаляет услугу
 */
export const deleteService = async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Number(idParam);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID должен быть числом" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Услуга с ID ${id} не найдена` });
    }

    res.json({ success: true, deletedId: id });
  } catch (err) {
    console.error("Ошибка при удалении услуги:", err);
    res.status(500).json({ error: "Не удалось удалить услугу" });
  }
};
