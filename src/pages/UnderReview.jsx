import { useNavigate } from "react-router-dom";
import StatusCard from "../components/StatusCard";

export default function UnderReview() {
  const navigate = useNavigate();
  return (
    <StatusCard
      tone="pending"
      icon="schedule"
      title="Under Review"
      subtitle="Your documents are under review. We'll let you know when it's complete."
      listTitle="What happens next?"
      list={[
        "Our team will verify your documents",
        "You'll be notified within 24–48 hours",
        "You can start adding your menu",
      ]}
      action="Go to Dashboard"
      onAction={() => navigate("/dashboard")}
    />
  );
}
