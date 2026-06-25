import { useState } from "react";
import TopAppBar from "../components/TopAppBar";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { categories as seed } from "../data/mock";

export default function ManageCategories() {
  const [cats, setCats] = useState(seed);
  const [adding, setAdding] = useState("");

  const add = () => {
    const name = adding.trim();
    if (!name) return;
    setCats((c) => [...c, name]);
    setAdding("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <TopAppBar showBack title="Menu" />
      <main className="flex-1 px-margin-mobile pt-stack-md pb-32 animate-fade-in">
        <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-stack-lg">
          Manage Categories
        </h2>
        <section className="flex flex-col gap-stack-sm">
          {cats.map((c) => (
            <Card key={c} className="p-4 flex items-center justify-between">
              <span className="text-body-md text-on-surface">{c}</span>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </Card>
          ))}
        </section>

        <div className="fixed bottom-6 left-0 right-0 px-margin-mobile flex gap-stack-sm">
          <input
            value={adding}
            onChange={(e) => setAdding(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="New category"
            className="flex-1 h-touch-target-min px-4 bg-surface-container-lowest border border-outline-variant rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <Button icon="add" iconRight={false} onClick={add}>
            Add
          </Button>
        </div>
      </main>
    </div>
  );
}
