import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import {
  STEPS,
  cuisines,
  foodCategories,
  serviceRadii,
} from "../data/onboarding";
import { saveStep } from "../store/useOnboarding";
import api from "../services/api";

function Select({ label, id, options, value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-label-lg font-label-lg text-on-surface-variant"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required
        className="w-full h-touch-target-min px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AboutFood() {
  const navigate = useNavigate();
  const s = STEPS.food;
  const [form, setForm] = useState({
    cuisine: "",
    category: "",
    radius: "",
    description: "",
  });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      await api.post("/api/onboarding/draft", { step: "food", data: form });
      saveStep("food", form);
      navigate(s.next);
    } catch (error) {
      setErr(
        error.response?.data?.error ||
          error.response?.data?.details?.[0]?.message ||
          "Failed to save. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingLayout step={s.step} stepLabel={s.label}>
      <Card className="p-6">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
          Tell us about your food
        </h2>
        <p className="text-body-md text-on-surface-variant mb-stack-lg">
          This helps customers discover your kitchen.
        </p>
        <form className="space-y-stack-lg" onSubmit={submit}>
          <Select
            label="Primary Cuisine"
            id="cuisine"
            options={cuisines}
            value={form.cuisine}
            onChange={set("cuisine")}
            placeholder="Select cuisine"
          />
          <Select
            label="Food Category"
            id="category"
            options={foodCategories}
            value={form.category}
            onChange={set("category")}
            placeholder="Select category"
          />
          <Select
            label="Serving Radius"
            id="radius"
            options={serviceRadii}
            value={form.radius}
            onChange={set("radius")}
            placeholder="Select radius"
          />
          <div>
            <label
              htmlFor="desc"
              className="block mb-2 text-label-lg font-label-lg text-on-surface-variant"
            >
              About Your Kitchen
            </label>
            <textarea
              id="desc"
              rows={3}
              value={form.description}
              onChange={set("description")}
              placeholder="Home-style North Indian meals, freshly cooked daily…"
              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-body-md text-on-surface placeholder:text-outline/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              required
            />
          </div>
          {err && (
            <div className="flex items-center gap-2 text-error px-4 py-3 bg-error-container rounded-lg">
              <Icon name="error" className="text-base" />
              <span className="text-label-lg font-label-lg">{err}</span>
            </div>
          )}
          <Button full icon="arrow_forward" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Continue"}
          </Button>
        </form>
      </Card>
    </OnboardingLayout>
  );
}
