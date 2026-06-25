import TopAppBar from "../components/TopAppBar";
import ContactView from "../components/ContactView";

export default function ContactPublic() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <TopAppBar showBack logo right={null} />
      <main className="flex-1 w-full max-w-xl mx-auto px-margin-mobile pt-stack-md pb-stack-lg animate-fade-in">
        <ContactView />
      </main>
    </div>
  );
}
