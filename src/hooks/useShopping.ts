"use client";
import { useState, useEffect, useMemo } from "react";
import { Item, FormState } from "@/types/shopping";

export function useShopping() {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [form, setForm] = useState<FormState>({ id: null, title: "", count: "", price: "" });

    // save
    useEffect(() => {
        const data = localStorage.getItem("shopping");

        if (!data) return;

        try {
            setItems(JSON.parse(data));
        } catch (e) {
            setItems([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shopping", JSON.stringify(items));
    }, [items]);

    // Filter
    const filteredItems = useMemo(() => {
        return items.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [items, searchQuery]);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const countNum = parseFloat(form.count);
        const priceNum = parseFloat(form.price);

        if (!form.title.trim() || isNaN(countNum) || countNum <= 0 || isNaN(priceNum) || priceNum <= 0) {
            alert("Invalid values write again!");
            return;
        }

        if (form.id !== null) {
            setItems(items.map(i => i.id === form.id ? { ...i, title: form.title.trim(), count: countNum, price: priceNum } : i));
        } else {
            setItems([...items, { id: Date.now(), title: form.title.trim(), count: countNum, price: priceNum, marked: false }]);
        }

        setForm({ id: null, title: "", count: "", price: "" });
    };

    // small truff
    const toggle = (id: number) => setItems(items.map(i => i.id === id ? { ...i, marked: !i.marked } : i));

    const remove = (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product? >:^}");

        if (isConfirmed) {
            setItems(items.filter(i => i.id !== id));
        }
    }
    
    const edit = (item: Item) => setForm({ id: item.id, title: item.title, count: String(item.count), price: String(item.price) });

    return { 
        items: filteredItems,
        searchQuery, 
        setSearchQuery, 
        form, 
        setForm, 
        handleSubmit, 
        toggle, 
        remove, 
        edit 
    };
}