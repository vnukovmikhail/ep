"use client";
import React, { useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
  count: number;
  price: number;
  marked: boolean;
};

type Form = {
  id: number | null;
  title: string;
  count: string;
  price: string;
};

export default function ShoppingWidget() {
    const [items, setItems] = useState<Item[]>([]);
    const [form, setForm] = useState<Form>({
        id: null,
        title: "",
        count: "",
        price: ""
    });

    useEffect(() => {
        const shopData = localStorage.getItem("shopping");
        if (!shopData) return;
        try {
            const parsed = JSON.parse(shopData) as Partial<Item>[];
            const normalized = parsed.map(p => ({
                id: Number(p.id) || Date.now(),
                title: String(p.title || ""),
                count: Number(p.count) || 0,
                price: Number(p.price) || 0,
                marked: Boolean(p.marked)
            }));
            setItems(normalized);
        } catch {
            setItems([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shopping", JSON.stringify(items));
    }, [items]);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const countNum = parseFloat(form.count);
        const priceNum = parseFloat(form.price);

        if (!form.title.trim() || isNaN(countNum) || countNum <= 0 || isNaN(priceNum) || priceNum <= 0) {
        alert("Incorrect values!");
        return;
        }

        if (form.id !== null) {
        setItems(items.map(i =>
            i.id === form.id ? { ...i, title: form.title.trim(), count: countNum, price: priceNum } : i
        ));
        } else {
        setItems([
            ...items,
            {
            id: Date.now(),
            title: form.title.trim(),
            count: countNum,
            price: priceNum,
            marked: false
            }
        ]);
        }

        setForm({ id: null, title: "", count: "", price: "" });
    }

    function toggle(id: number) {
        setItems(items.map(i =>
        i.id === id ? { ...i, marked: !i.marked } : i
        ));
    }

    function edit(item: Item) {
        setForm({
        id: item.id,
        title: item.title,
        count: String(item.count),
        price: String(item.price)
        });
    }

    function remove(id: number) {
        setItems(items.filter(i => i.id !== id));
    }

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <h2>List of products:</h2>

            <form onSubmit={handleSubmit}>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, title: e.target.value })} value={form.title} />
                <input type="number" value={form.count} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, count: e.target.value })}/>
                <input type="number" value={form.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, price: e.target.value })}/>
                <button type="submit">Add!</button>
            </form>

            <ul>
                {items.map(item => (
                <li key={item.id}>
                    <span>{item.title} - {item.count} Price - {item.price} $</span>
                    <button type="button" onClick={() => toggle(item.id)}>Mark</button>
                    <button type="button" onClick={() => edit(item)}>Edit</button>
                    <button type="button" onClick={() => remove(item.id)}>Remove</button>
                </li>
                ))}
            </ul>
        </div>
    );
}