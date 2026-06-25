import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "../components/TopAppBar";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { reuploadDocs } from "../data/mock";
import { setVerification } from "../store/useSession";

export default function DocumentReupload() {
  const [uploaded, setUploaded] = useState({});
  const navigate = useNavigate();
  const toggle = (id) => setUploaded((u) => ({ ...u, [id]: !u[id] }));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <TopAppBar showBack title="Re-upload Documents" />
      <main className="flex-1 px-margin-mobile pt-stack-md pb-32 animate-fade-in">
        <p className="text-body-md text-on-surface-variant mb-stack-lg">
          Please upload the correct documents.
        </p>
        <section className="flex flex-col gap-stack-md">
          {reuploadDocs.map((doc) => {
            const done = uploaded[doc.id];
            return (
              <button
                key={doc.id}
                onClick={() => toggle(doc.id)}
                className={`flex items-center justify-between gap-3 p-4 bg-surface-container-lowest rounded-lg border shadow-card transition-all text-left ${
                  done
                    ? "border-primary"
                    : doc.flagged
                      ? "border-error/40"
                      : "border-outline-variant"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                    <Icon name={doc.icon} />
                  </div>
                  <p className="font-semibold text-body-md text-on-surface">
                    {doc.title}
                  </p>
                </div>
                <Icon
                  name={done ? "check_circle" : "upload"}
                  fill={done}
                  className={`text-[28px] ${done ? "text-primary" : "text-outline"}`}
                />
              </button>
            );
          })}
        </section>
        <div className="fixed bottom-6 left-0 right-0 px-margin-mobile">
          <Button
            full
            onClick={() => {
              setVerification("submitted");
              navigate("/verification-submitted");
            }}
          >
            Resubmit for Verification
          </Button>
        </div>
      </main>
    </div>
  );
}
