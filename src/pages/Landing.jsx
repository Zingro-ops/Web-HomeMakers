import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return setShown(true);
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.disconnect()),
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    icon: "how_to_reg",
    title: "Sign up & verify",
    desc: "Register with your phone number. Quick KYC — PAN, bank, and FSSAI, done in minutes.",
  },
  {
    icon: "restaurant_menu",
    title: "List your menu",
    desc: "Add your dishes, prices, and photos. You choose your radius, your hours, your prices.",
  },
  {
    icon: "trending_up",
    title: "Start earning",
    desc: "Orders land on your phone. Payouts land in your bank. No middleman, no guesswork.",
  },
];

const features = [
  {
    icon: "verified_user",
    title: "Verified & Trusted",
    desc: "Every kitchen is KYC-verified before it goes live to customers.",
  },
  {
    icon: "payments",
    title: "Fair Payouts",
    desc: "Transparent commission. Money moves straight to your account.",
  },
  {
    icon: "smartphone",
    title: "Runs From Your Phone",
    desc: "No laptop, no dashboard to learn. Just your phone and your kitchen.",
  },
  {
    icon: "support_agent",
    title: "A Team That Answers",
    desc: "Real people on the other end when you need help.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [showCustomerNote, setShowCustomerNote] = useState(false);
  const [rung, setRung] = useState(false);

  const ringBell = () => {
    setRung(true);
    setTimeout(() => setRung(false), 1400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-sm border-b border-outline-variant/60">
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto px-margin-mobile h-touch-target-min">
          <span className="text-[22px] font-black text-primary tracking-tight">
            ZINGRO
          </span>
          <button
            onClick={() => navigate("/language")}
            aria-label="Change language"
            className="w-touch-target-min h-touch-target-min flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all"
          >
            <Icon name="language" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-fixed opacity-70 blur-[80px]" />
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-secondary-fixed opacity-60 blur-[90px]" />
          <div className="absolute bottom-0 right-10 w-56 h-56 rounded-full bg-tertiary-fixed opacity-50 blur-[70px]" />
        </div>

        <div className="max-w-2xl mx-auto px-margin-mobile pt-stack-lg pb-10">
          <span className="inline-block text-label-sm font-label-sm uppercase tracking-[0.15em] text-primary mb-3">
            Now serving Bengaluru
          </span>
          <h1 className="text-[38px] sm:text-[46px] leading-[1.05] font-black text-on-surface tracking-tight mb-4">
            We gave home
            <br />
            kitchens a{" "}
            <span className="relative inline-block text-primary">
              doorbell.
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-md mb-8">
            Zingro turns everyday home kitchens into verified food businesses —
            real recipes, real cooks, real earnings.
          </p>

          {/* Doorbell signature moment */}
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-tertiary-fixed via-primary-fixed to-secondary-fixed h-64 sm:h-72 mb-6 flex items-center justify-center">
            <img
              src="/hero-kitchen.jpg"
              alt="A homemaker cooking in her kitchen"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />

            <button
              onClick={ringBell}
              aria-label="Ring the doorbell"
              className="absolute bottom-5 right-5 flex items-center gap-3"
            >
              {rung && (
                <span className="text-label-sm font-label-sm bg-surface-container-lowest text-on-surface px-3 py-1.5 rounded-full shadow-modal animate-fade-in">
                  Ding! That's Zingro.
                </span>
              )}
              <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-on-primary shadow-modal active:scale-90 transition-transform">
                {rung && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                )}
                <Icon
                  name="notifications_active"
                  className="text-[28px] relative"
                  fill
                />
              </span>
            </button>
          </div>

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
            <div className="mt-4 p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed animate-fade-in">
              <p className="text-label-lg font-label-lg mb-1">Coming soon</p>
              <p className="text-body-md opacity-90">
                The Zingro customer app is on its way — check back soon to order
                home-cooked meals near you.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { icon: "eco", label: "100% Home Cooked" },
              { icon: "verified", label: "FSSAI Verified" },
              { icon: "location_on", label: "Made in Bengaluru" },
            ].map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant text-label-sm font-label-sm text-on-surface-variant"
              >
                <Icon name={b.icon} className="text-[16px] text-primary" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-2xl mx-auto w-full px-margin-mobile py-stack-lg">
        <Reveal>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-1">
            From your stove to their doorstep
          </h2>
          <p className="text-body-md text-on-surface-variant mb-stack-lg">
            Three steps. About ten minutes.
          </p>
        </Reveal>
        <div className="flex flex-col gap-stack-md">
          {steps.map((s, i) => (
            <Reveal key={s.title}>
              <Card className="p-4 flex items-start gap-4">
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
                  <p className="text-body-md text-on-surface-variant">
                    {s.desc}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-2xl mx-auto w-full px-margin-mobile py-stack-lg">
        <Reveal>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-lg">
            Why homemakers choose Zingro
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-stack-sm">
          {features.map((f) => (
            <Reveal key={f.title}>
              <Card className="p-4 h-full">
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* Voice quote */}
      <section className="max-w-2xl mx-auto w-full px-margin-mobile py-stack-lg">
        <Reveal>
          <Card className="p-6 bg-tertiary-fixed border-none">
            <Icon
              name="format_quote"
              className="text-tertiary text-[32px] mb-2"
            />
            <p className="text-headline-md font-headline-md text-on-tertiary-fixed mb-2">
              Every home kitchen has a story worth tasting.
            </p>
            <p className="text-body-md text-on-tertiary-fixed opacity-80">
              Zingro exists to help you tell yours — and get paid for it.
            </p>
          </Card>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto w-full px-margin-mobile py-stack-lg">
        <Reveal>
          <Card className="p-6 text-center bg-primary-fixed border-none">
            <h2 className="text-headline-md font-headline-md text-on-primary-fixed mb-2">
              Ready to turn your kitchen into a business?
            </h2>
            <p className="text-body-md text-on-primary-fixed opacity-80 mb-stack-md">
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
        </Reveal>
      </section>

      <footer className="mt-auto py-stack-lg border-t border-outline-variant">
        <div className="max-w-2xl mx-auto w-full px-margin-mobile flex flex-col items-center gap-3 text-center">
          <span className="text-[20px] font-black text-primary tracking-tight">
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
