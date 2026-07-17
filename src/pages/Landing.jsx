import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";

const steps = [
  {
    icon: "how_to_reg",
    title: "Sign up & verify",
    desc: "Register with your phone number and complete quick KYC — PAN, bank, and FSSAI.",
  },
  {
    icon: "restaurant_menu",
    title: "List your menu",
    desc: "Add your dishes, prices, and photos. Set your own serving radius and hours.",
  },
  {
    icon: "trending_up",
    title: "Start earning",
    desc: "Receive orders, manage them from your phone, and get paid directly to your bank.",
  },
];

const features = [
  {
    icon: "verified_user",
    title: "Verified & Trusted",
    desc: "Every kitchen is KYC-verified before going live.",
  },
  {
    icon: "payments",
    title: "Fair Payouts",
    desc: "Transparent commission, direct bank transfers.",
  },
  {
    icon: "smartphone",
    title: "Simple to Use",
    desc: "Manage orders and menu from your phone, no laptop needed.",
  },
  {
    icon: "support_agent",
    title: "Real Support",
    desc: "A team that actually picks up the phone.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [showCustomerNote, setShowCustomerNote] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center w-full max-w-lg mx-auto px-margin-mobile h-touch-target-min">
          <span className="font-headline-lg text-headline-lg font-extrabold text-primary tracking-tight">
            ZINGRO
          </span>
          <button
            onClick={() => navigate("/language")}
            aria-label="Change language"
            className="w-touch-target-min h-touch-target-min flex items-center justify-center text-primary active:scale-95 transition-transform"
          >
            <Icon name="language" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[350px] h-[350px] bg-primary-fixed-dim rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-secondary-container rounded-full blur-[120px]" />
        </div>

        <div className="max-w-lg mx-auto px-margin-mobile pt-stack-lg pb-stack-lg text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-stack-md rounded-3xl bg-primary-fixed/40 flex items-center justify-center">
            <Icon name="storefront" className="text-primary text-[40px]" />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">
            Home-cooked meals,
            <br />
            made with love
          </h1>
          <p className="text-body-md text-on-surface-variant mb-stack-lg">
            Zingro connects home kitchens with people craving real, home-style
            food — starting in Bengaluru.
          </p>

          <div className="flex flex-col gap-stack-sm">
            <Button
              full
              icon="arrow_forward"
              onClick={() => navigate("/language")}
              className="h-14"
            >
              Become a Homemaker Partner
            </Button>
            <Button
              full
              variant="outline"
              icon="restaurant"
              iconRight={false}
              onClick={() => setShowCustomerNote((v) => !v)}
            >
              Order Food
            </Button>
          </div>

          {showCustomerNote && (
            <div className="mt-stack-md p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-left animate-fade-in">
              <p className="text-label-lg font-label-lg mb-1">Coming soon</p>
              <p className="text-body-md opacity-90">
                The Zingro customer app is on its way. Check back soon to order
                home-cooked meals near you.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-stack-lg">
            {["100% Home Cooked", "FSSAI Verified", "Made in Bengaluru"].map(
              (b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant text-label-sm font-label-sm text-on-surface-variant"
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-lg mx-auto w-full px-margin-mobile py-stack-lg">
        <h2 className="text-headline-md font-headline-md text-on-surface text-center mb-stack-lg">
          How it works
        </h2>
        <div className="flex flex-col gap-stack-md">
          {steps.map((s, i) => (
            <Card key={s.title} className="p-4 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-md font-headline-md">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={s.icon} className="text-primary text-[20px]" />
                  <h3 className="font-label-lg text-label-lg text-on-surface">
                    {s.title}
                  </h3>
                </div>
                <p className="text-body-md text-on-surface-variant">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-lg mx-auto w-full px-margin-mobile py-stack-lg">
        <h2 className="text-headline-md font-headline-md text-on-surface text-center mb-stack-lg">
          Why homemakers choose Zingro
        </h2>
        <div className="grid grid-cols-2 gap-stack-sm">
          {features.map((f) => (
            <Card key={f.title} className="p-4">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mb-3">
                <Icon name={f.icon} className="text-[20px]" />
              </div>
              <h3 className="font-label-lg text-label-lg text-on-surface mb-1">
                {f.title}
              </h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-lg mx-auto w-full px-margin-mobile py-stack-lg">
        <Card className="p-6 text-center bg-primary-fixed/30 border-primary/20">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
            Ready to turn your kitchen into a business?
          </h2>
          <p className="text-body-md text-on-surface-variant mb-stack-md">
            Onboarding takes about 10 minutes.
          </p>
          <Button
            full
            icon="arrow_forward"
            onClick={() => navigate("/language")}
          >
            Get Started
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-stack-lg border-t border-outline-variant">
        <div className="max-w-lg mx-auto w-full px-margin-mobile flex flex-col items-center gap-3 text-center">
          <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
            ZINGRO
          </span>
          <button
            onClick={() => navigate("/contact")}
            className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact & Support
          </button>
          <p className="text-label-sm text-outline uppercase tracking-widest">
            Empowering Home Chefs Everywhere
          </p>
          <p className="text-label-sm text-outline">
            © {new Date().getFullYear()} Zingro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
