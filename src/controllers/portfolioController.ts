import { pool } from "../database/pool";

// GET /api/v1/portfolio
export const getPortfolio = async (req: any, res: any) => {
  try {
    const result = await pool.query(
      `SELECT id, title, category, description, image, video_url AS "videoUrl", featured
       FROM portfolio_items
       ORDER BY id DESC`,
    );
    res.json(result.rows);
  } catch (err: any) {
    console.error("Portfolio GET error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/v1/portfolio
export const addPortfolioItem = async (req: any, res: any) => {
  const { title, category, description, image, videoUrl, featured } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "title и category обязательны" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO portfolio_items (title, category, description, image, video_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, category, description, image, video_url AS "videoUrl", featured`,
      [
        title,
        category,
        description || "",
        image || "",
        videoUrl || "",
        featured || false,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Portfolio POST error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/v1/portfolio/:id
export const updatePortfolioItem = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, category, description, image, videoUrl, featured } = req.body;

  try {
    const result = await pool.query(
      `UPDATE portfolio_items
       SET title = $1, category = $2, description = $3, image = $4, video_url = $5, featured = $6
       WHERE id = $7
       RETURNING id, title, category, description, image, video_url AS "videoUrl", featured`,
      [title, category, description, image, videoUrl, featured, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Проект не найден" });
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Portfolio PUT error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/v1/portfolio/:id
export const deletePortfolioItem = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM portfolio_items WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Проект не найден" });
    }
    res.json({ message: "Удалено", id: Number(id) });
  } catch (err: any) {
    console.error("Portfolio DELETE error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
