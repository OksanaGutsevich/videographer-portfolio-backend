//videographer-portfolio-backend\src\server.ts
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
