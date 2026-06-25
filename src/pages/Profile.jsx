import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import { profile } from "../data/mock";

function Row({ label, value }) {
  return (
    <div className="py-stack-sm border-b border-outline-variant last:border-0">
      <p className="text-label-sm font-label-sm text-outline">{label}</p>
      <p className="text-body-md text-on-surface mt-0.5">{value}</p>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  return (
    <main className="px-margin-mobile pt-stack-md pb-stack-lg animate-fade-in">
      <Card className="p-5">
        <div className="flex items-center gap-4 mb-stack-md">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
            <Icon name="storefront" className="text-[32px]" />
          </div>
          <div className="flex-1">
            <h2 className="text-headline-md font-headline-md text-on-surface">
              {profile.kitchenName}
            </h2>
            <p className="text-label-sm font-label-sm text-on-surface-variant">
              Kitchen Profile
            </p>
          </div>
          <button
            aria-label="Edit profile"
            className="w-touch-target-min h-touch-target-min flex items-center justify-center text-primary active:scale-95"
          >
            <Icon name="edit" />
          </button>
        </div>

        <div>
          <Row label="Email" value={profile.email} />
          <Row label="Phone Number" value={profile.phone} />
          <Row label="Cuisine Type" value={profile.cuisine} />
          <Row label="Years of Experience" value={profile.experience} />
        </div>
      </Card>

      <p className="text-center text-label-sm font-label-sm text-outline mt-stack-lg">
        App Version {profile.version}
      </p>

      <button
        onClick={() => navigate("/login")}
        className="w-full mt-stack-md flex items-center justify-center gap-2 h-touch-target-min rounded-lg border border-error/30 text-error font-label-lg text-label-lg active:bg-error-container transition-colors"
      >
        <Icon name="logout" /> Log Out
      </button>
    </main>
  );
}
