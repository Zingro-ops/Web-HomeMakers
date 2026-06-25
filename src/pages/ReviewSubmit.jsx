import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { STEPS } from "../data/onboarding";
import { setVerification } from "../store/useSession";
const sections = [
  {
    icon: "person",
    title: "Personal Information",
    sub: "Sunita Sharma",
    to: "/personal-information",
  },
  {
    icon: "restaurant",
    title: "Kitchen Details",
    sub: "North Indian · 15–20 meals/day",
    to: "/kitchen-information",
  },
  {
    icon: "location_on",
    title: "Address Details",
    sub: "B-204 Lotus PG, Bandra West, 400050",
    to: "/address-details",
  },
  {
    icon: "account_balance",
    title: "Bank & UPI Details",
    sub: "A/c: XXXX 4121",
    to: "/bank-details",
  },
];

export default function ReviewSubmit() {
  const navigate = useNavigate();
  const s = STEPS.review;
  return (
    <OnboardingLayout step={s.step} stepLabel={s.label}>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-stack-lg">
        Review your details
      </h2>
      <section className="flex flex-col gap-stack-md">
        {sections.map((item) => (
          <Card key={item.title} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <Icon name={item.icon} />
            </div>
            <div className="flex-1">
              <p className="font-label-lg text-label-lg text-on-surface">
                {item.title}
              </p>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                {item.sub}
              </p>
            </div>
            <button
              aria-label={`Edit ${item.title}`}
              onClick={() => navigate(item.to)}
              className="text-on-surface-variant active:scale-95"
            >
              <Icon name="edit" className="text-[20px]" />
            </button>
          </Card>
        ))}
      </section>
      <div className="mt-stack-lg">
        <Button
          full
          onClick={() => {
            setVerification("submitted");
            navigate("/verification-submitted");
          }}
        >
          Submit Application
        </Button>
      </div>
    </OnboardingLayout>
  );
}
