const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const chefWhatsapp = "573046356202";

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/api/order", (req, res) => {
  const waText = encodeURIComponent(
    [
      "Hola chef,",
      "",
      "Pedido confirmado.",
      "",
      "Detalle del pedido:",
      `Pedido: ${req.query.dish || "Pedido sin nombre"}`,
      `Precio: ${req.query.price || "Por confirmar"}`,
      `Categoría: ${req.query.category || "Sin categoría"}`,
      `Punto de cocción: ${req.query.cooking || "No informado"}`,
      `Temperatura de servicio: ${req.query.temperature || "No informada"}`,
      "",
      "Gracias."
    ].join("\n")
  );

  const whatsappUrl = `https://wa.me/${chefWhatsapp}?text=${waText}`;
  return res.json({ ok: true, whatsappUrl });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor Vizi escuchando en http://localhost:${PORT}`);
});
