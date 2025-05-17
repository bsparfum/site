import React, { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);

  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [clientName, setClientName] = useState("");
  const [saleProductId, setSaleProductId] = useState("");
  const [saleClientId, setSaleClientId] = useState("");
  const [saleQty, setSaleQty] = useState("");

  // Добавление товара
  const addProduct = () => {
    if (!productName || !productQty) return alert("Введите название и количество");
    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      qty: Number(productQty),
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductQty("");
  };

  // Добавление клиента
  const addClient = () => {
    if (!clientName) return alert("Введите имя клиента");
    const newClient = {
      id: Date.now().toString(),
      name: clientName,
    };
    setClients([...clients, newClient]);
    setClientName("");
  };

  // Добавление продажи
  const addSale = () => {
    if (!saleProductId || !saleClientId || !saleQty)
      return alert("Выберите товар, клиента и количество");

    const product = products.find((p) => p.id === saleProductId);
    if (!product || product.qty < Number(saleQty)) {
      return alert("Недостаточно товара на складе");
    }

    const newSale = {
      id: Date.now().toString(),
      productId: saleProductId,
      clientId: saleClientId,
      qty: Number(saleQty),
      date: new Date().toLocaleString(),
    };

    setSales([...sales, newSale]);
    // Обновляем количество товара на складе
    setProducts(
      products.map((p) =>
        p.id === saleProductId ? { ...p, qty: p.qty - Number(saleQty) } : p
      )
    );

    setSaleProductId("");
    setSaleClientId("");
    setSaleQty("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>CRM — Учёт продаж и склада</h1>

      <section>
        <h2>Добавить товар</h2>
        <input
          placeholder="Название товара"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Количество"
          value={productQty}
          onChange={(e) => setProductQty(e.target.value)}
        />
        <button onClick={addProduct}>Добавить товар</button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Добавить клиента</h2>
        <input
          placeholder="Имя клиента"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <button onClick={addClient}>Добавить клиента</button>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Добавить продажу</h2>
        <select
          value={saleProductId}
          onChange={(e) => setSaleProductId(e.target.value)}
        >
          <option value="">Выберите товар</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (в наличии: {p.qty})
            </option>
          ))}
        </select>

        <select
          value={saleClientId}
          onChange={(e) => setSaleClientId(e.target.value)}
        >
          <option value="">Выберите клиента</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Количество"
          value={saleQty}
          onChange={(e) => setSaleQty(e.target.value)}
        />
        <button onClick={addSale}>Добавить продажу</button>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Товары на складе</h2>
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} — {p.qty} шт.
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Продажи</h2>
        <ul>
          {sales.map((s) => {
            const product = products.find((p) => p.id === s.productId);
            const client = clients.find((c) => c.id === s.clientId);
            return (
              <li key={s.id}>
                {s.date}: Продано {s.qty} шт. товара "{product?.name}" клиенту "
                {client?.name}"
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
