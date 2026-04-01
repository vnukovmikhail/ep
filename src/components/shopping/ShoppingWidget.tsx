"use client";
import { useShopping } from "@/hooks/useShopping";

export default function ShoppingWidget() {
  const { 
    items, 
    searchQuery, 
    setSearchQuery, 
    form, 
    setForm, 
    handleSubmit, 
    toggle, 
    remove, 
    edit 
  } = useShopping();

  return (
    <div className="max-w-[650px] mx-auto p-4">
      <h2 className="text-lg font-bold mb-2">List of products:</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          className="border-2 border-gray-300 rounded px-2 py-1"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <div className="flex gap-2">
          <input
            className="border-2 border-gray-300 rounded px-2 py-1 flex-1"
            type="number"
            placeholder="Count"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: e.target.value })}
          />
          <input
            className="border-2 border-gray-300 rounded px-2 py-1 flex-1"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition" type="submit">
          {form.id ? "Save Changes" : "Add to List"}
        </button>
      </form>

      <div className="relative">
        <input
          className="w-full border-2 border-blue-100 p-3 rounded-xl focus:border-blue-400 outline-none transition-all"
          placeholder="Search product by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 p-2 border-b">
            <span 
              className={`flex-1 ${item.marked ? "line-through text-gray-400" : ""}`}
            >
              {item.title} — {item.count} pcs. ({item.price} $)
            </span>
            <div className="flex gap-2 text-sm">
              <button className="text-green-300" onClick={() => toggle(item.id)}>Mark</button>
              <button className="text-blue-300" onClick={() => edit(item)}>Edit</button>
              <button className="text-red-300" onClick={() => remove(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul> */}

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-100 text-left">
            <th className="pb-2 font-semibold">Title</th>
            <th className="pb-2 font-semibold text-center">Count</th>
            <th className="pb-2 font-semibold text-right">Price</th>
            <th className="pb-2 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr 
              key={item.id} 
              className={`border-b last:border-0 hover:bg-gray-50 transition-colors ${
                item.marked ? "line-through text-gray-400" : ""
              }`}
            >
              <td className="py-3">{item.title}</td>
              <td className="py-3 text-center">{item.count} pcs.</td>
              <td className="py-3 text-right">${Number(item.price).toFixed(2)}</td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-2 text-sm">
                  <button className="text-green-500 hover:underline" onClick={() => toggle(item.id)}>Mark</button>
                  <button className="text-blue-500 hover:underline" onClick={() => edit(item)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => remove(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {items.length > 0 && (
        <div className="mt-4 pt-2 flex justify-between items-center text-white-600">
          <span className="text-sm uppercase tracking-wider font-semibold">Total Est.</span>
          <span className="text-2xl font-white font-bold">
            {/* сумма всех товаров, а ту фиксед для десятичных, сотых, после запятой */}
            ${items.reduce((acc, item) => acc + (item.price * item.count), 0).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}