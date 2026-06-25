import { useNavigate } from "react-router-dom";
import StatusCard from "../components/StatusCard";
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import { rejectionReasons } from "../data/mock";

export default function VerificationRejected() {
  const navigate = useNavigate();
  return (
    <StatusCard
      tone="error"
      icon="cancel"
      title="Verification Rejected"
      subtitle="Please address the following issues."
      action="Re-upload Documents"
      onAction={() => navigate("/document-reupload")}
    >
      <Card className="w-full p-4 text-left border-error/30">
        <h3 className="text-label-lg font-label-lg text-error mb-3">
          Reason for Rejection
        </h3>
        <ul className="space-y-3">
          {rejectionReasons.map((r) => (
            <li
              key={r}
              className="flex items-start gap-3 text-body-md text-on-surface-variant"
            >
              <Icon
                name="error"
                fill
                className="text-error text-[20px] mt-0.5 shrink-0"
              />
              {r}
            </li>
          ))}
        </ul>
      </Card>
    </StatusCard>
  );
}
