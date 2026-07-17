import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";

export default function Landing() {
  const navigate = useNavigate();
  const [showCustomerNote, setShowCustomerNote] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-primary-fixed-dim rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] bg-secondary-container rounded-full blur-[120px]" />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-stack-lg w-full max-w-md mx-auto text-center">
        <span className="font-headline-lg text-[48px] font-extrabold text-primary tracking-tight mb-2">
          ZINGRO
        </span>
        <p className="text-body-md text-on-surface-variant mb-12">
          Home-cooked meals, made with love
        </p>

        <div className="w-full flex flex-col gap-stack-md">
          <button
            onClick={() => navigate("/language")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-primary text-on-primary shadow-card active:scale-[0.98] transition-all text-left"
          >
            <div className="w-12 h-12 rounded-full bg-on-primary/15 flex items-center justify-center shrink-0">
              <Icon name="storefront" className="text-[24px]" />
            </div>
            <div className="flex-1">
              <p className="font-headline-md text-headline-md">
                I'm a Homemaker
              </p>
              <p className="text-label-sm font-label-sm opacity-90">
                Start selling your home-cooked food
              </p>
            </div>
            <Icon name="arrow_forward" />
          </button>

          <button
            onClick={() => setShowCustomerNote(true)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant active:scale-[0.98] transition-all text-left"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface-variant">
              <Icon name="restaurant" className="text-[24px]" />
            </div>
            <div className="flex-1">
              <p className="font-headline-md text-headline-md text-on-surface">
                I'm a Customer
              </p>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Order home-cooked meals near you
              </p>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </button>
        </div>

        {showCustomerNote && (
          <div className="w-full mt-stack-md p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-left">
            <p className="text-label-lg font-label-lg mb-1">Coming soon</p>
            <p className="text-body-md opacity-90">
              The Zingro customer app is on its way. Check back soon to order
              home-cooked meals near you.
            </p>
          </div>
        )}
      </main>

      <footer className="pb-stack-lg text-center">
        <p className="text-label-sm text-outline uppercase tracking-widest">
          Empowering Home Chefs Everywhere
        </p>
      </footer>
    </div>
  );
}
