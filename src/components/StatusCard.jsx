import { Card } from "./Card";
import Button from "./Button";
import Icon from "./Icon";

const tones = {
  success: "bg-primary-fixed text-primary",
  pending: "bg-tertiary-fixed text-tertiary",
  error: "bg-error-container text-error",
};

/** Centered status hero used by verification screens. */
export default function StatusCard({
  tone = "success",
  icon,
  title,
  subtitle,
  list,
  listTitle,
  action,
  onAction,
  children,
}) {
  return (
    <main className="flex-1 px-margin-mobile pt-stack-lg pb-32 flex flex-col items-center text-center animate-fade-in">
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center mb-stack-lg ${tones[tone]}`}
      >
        <Icon name={icon} fill className="text-[56px]" />
      </div>
      <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-2">
        {title}
      </h1>
      <p className="text-body-md text-on-surface-variant max-w-xs mb-stack-lg">
        {subtitle}
      </p>

      {list && (
        <Card className="w-full p-4 text-left">
          {listTitle && (
            <h3 className="text-label-lg font-label-lg text-on-surface mb-3">
              {listTitle}
            </h3>
          )}
          <ul className="space-y-3">
            {list.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body-md text-on-surface-variant"
              >
                <Icon
                  name="check_circle"
                  fill
                  className="text-primary text-[20px] mt-0.5 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {children}

      {action && (
        <div className="fixed bottom-24 left-0 right-0 px-margin-mobile">
          <Button full onClick={onAction}>
            {action}
          </Button>
        </div>
      )}
    </main>
  );
}
