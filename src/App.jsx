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

  const addClient = () => {
    if (!clientName) return alert("Введите имя клиента");
    const newClient = {
      id: Date.now().toString(),
      name: clientName,
    };
    setClients([...clients, newClient]);
    setClientName("");
  };

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
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">CRM — Учёт продаж и склада</h1>

      <section className="mb-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Добавить товар</h2>
        <div className="flex gap-4">
          <input
            className="border rounded px-3 py-2 flex-grow"
            placeholder="Название товара"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            className="border rounded px-3 py-2 w-24"
            placeholder="Количество"
            value={productQty}
            onChange={(e) => setProductQty(e.target.value)}
          />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Добавить
          </button>
        </div>
      </section>

      <section className="mb-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Добавить клиента</h2>
        <div className="flex gap-4">
          <input
            className="border rounded px-3 py-2 flex-grow"
            placeholder="Имя клиента"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <button
            onClick={addClient}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Добавить
          </button>
        </div>
      </section>

      <section className="mb-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Добавить продажу</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <select
            className="border rounded px-3 py-2 flex-grow min-w-[180px]"
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
            className="border rounded px-3 py-2 flex-grow min-w-[180px]"
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
            className="border rounded px-3 py-2 w-24"
            placeholder="Количество"
            value={saleQty}
            onChange={(e) => setSaleQty(e.target.value)}
          />
          <button
            onClick={addSale}
            className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
          >
            Добавить
          </button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Товары на складе</h2>
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="border rounded px-4 py-2 bg-white shadow flex justify-between"
            >
              <span>{p.name}</span>
              <span className="font-semibold">{p.qty} шт.</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Продажи</h2>
        <ul className="space-y-2">
          {sales.map((s) => {
            const product = products.find((p) => p.id === s.productId);
            const client = clients.find((c) => c.id === s.clientId);
            return (
              <li
                key={s.id}
                className="border rounded px-4 py-2 bg-white shadow"
              >
                {s.date}: Продано {s.qty} шт. товара "<strong>{product?.name}</strong>" клиенту "<strong>{client?.name}</strong>"
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
