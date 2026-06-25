import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { Card } from "../components/Card";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { STEPS, cuisines, foodCategories } from "../data/onboarding";

function Select({ label, id, options, placeholder }) {
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
        defaultValue=""
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

export default function KitchenInformation() {
  const navigate = useNavigate();
  const s = STEPS.kitchen;
  return (
    <OnboardingLayout step={s.step} stepLabel={s.label}>
      <Card className="p-6">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-stack-lg">
          Tell us about your food
        </h2>
        <form
          className="space-y-stack-lg"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(s.next);
          }}
        >
          <Select
            label="Cuisine Type"
            id="cuisine"
            options={cuisines}
            placeholder="Select cuisine type"
          />
          <Select
            label="Food Category"
            id="category"
            options={foodCategories}
            placeholder="Select food category"
          />
          <TextField
            label="Cooking Capacity (per day)"
            id="capacity"
            inputMode="numeric"
            placeholder="e.g. 20 meals"
            required
          />
          <Button full icon="arrow_forward" type="submit">
            Continue
          </Button>
        </form>
      </Card>
    </OnboardingLayout>
  );
}
