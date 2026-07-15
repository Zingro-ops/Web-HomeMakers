import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { addDish } from "../store/useDishes";
import { categories } from "../data/mock";

export default function AddDish() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    desc: "",
  });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      await addDish({
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        desc: form.desc.trim(),
      });
      navigate("/menu");
    } catch (error) {
      setErr(
        error.response?.data?.error ||
          error.response?.data?.details?.[0]?.message ||
          "Failed to add dish. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <TopAppBar showBack title="Menu" />
      <main className="flex-1 px-margin-mobile pt-stack-md pb-stack-lg animate-fade-in">
        <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-stack-lg">
          Add New Dish
        </h2>
        <form className="space-y-stack-lg" onSubmit={submit}>
          <TextField
            label="Dish Name"
            id="name"
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Veg Thali"
            required
          />

          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-label-lg font-label-lg text-on-surface-variant"
            >
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={set("category")}
              required
              className="w-full h-touch-target-min px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <TextField
            label="Price (₹)"
            id="price"
            inputMode="numeric"
            value={form.price}
            onChange={set("price")}
            placeholder="0.00"
            required
          />

          <div>
            <label
              htmlFor="desc"
              className="block mb-2 text-label-lg font-label-lg text-on-surface-variant"
            >
              Description (Optional)
            </label>
            <textarea
              id="desc"
              value={form.desc}
              onChange={set("desc")}
              rows={3}
              placeholder="Dish description"
              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          {err && (
            <div className="flex items-center gap-2 text-error px-4 py-3 bg-error-container rounded-lg">
              <Icon name="error" className="text-base" />
              <span className="text-label-lg font-label-lg">{err}</span>
            </div>
          )}

          <Button full type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create Dish"}
          </Button>
        </form>
      </main>
    </div>
  );
}
