import { useNavigate } from "react-router-dom";
import StatusCard from "../components/StatusCard";
import { setVerification } from "../store/useSession";
export default function VerificationSubmitted() {
  const navigate = useNavigate();
  return (
    <StatusCard
      tone="success"
      icon="check_circle"
      title="Verification Submitted!"
      subtitle="We've received your documents and are reviewing them."
      listTitle="What happens next?"
      list={[
        "Our team will verify your documents",
        "You'll be notified within 24–48 hours",
        "You can start adding your menu",
      ]}
      action="Go to Dashboard"
      onAction={() => {
        setVerification("review");
        navigate("/dashboard");
      }}
    />
  );
}
