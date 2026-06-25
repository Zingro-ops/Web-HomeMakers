import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { Card } from "../components/Card";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { STEPS, banks } from "../data/onboarding";

export default function BankDetails() {
  const navigate = useNavigate();
  const s = STEPS.bank;
  return (
    <OnboardingLayout step={s.step} stepLabel={s.label}>
      <Card className="p-6">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-stack-lg">
          Add your bank account details
        </h2>
        <form
          className="space-y-stack-lg"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(s.next);
          }}
        >
          <TextField
            label="Account Holder Name"
            id="holder"
            placeholder="e.g. Sunita Sharma"
            required
          />
          <div>
            <label
              htmlFor="bank"
              className="block mb-2 text-label-lg font-label-lg text-on-surface-variant"
            >
              Bank Name
            </label>
            <select
              id="bank"
              defaultValue=""
              required
              className="w-full h-touch-target-min px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-body-md text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="" disabled>
                Select bank
              </option>
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <TextField
            label="Account Number"
            id="account"
            inputMode="numeric"
            placeholder="Enter account number"
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
