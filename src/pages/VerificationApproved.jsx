import { useNavigate } from "react-router-dom";
import StatusCard from "../components/StatusCard";

export default function VerificationApproved() {
  const navigate = useNavigate();
  return (
    <StatusCard
      tone="success"
      icon="verified"
      title="Verified & Approved!"
      subtitle="Congratulations! Your kitchen is now live on ZINGRO."
      listTitle="You can now:"
      list={[
        "Start receiving orders",
        "Manage your menu",
        "Track your earnings",
      ]}
      action="Go to Dashboard"
      onAction={() => navigate("/dashboard")}
    />
  );
}
