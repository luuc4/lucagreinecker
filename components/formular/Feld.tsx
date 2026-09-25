import { clsx } from "clsx";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

// Eingabefelder mit Beschriftung darüber (kein Floating-Label), eine Quelle
// je Look. Hinweis und Fehler hängen per aria-describedby am Feld, der
// Fehler zusätzlich mit aria-invalid. 52 px hoch wie der mittlere Knopf.
// Schriftgröße ≥ 16 px kommt aus globals.css (iOS zoomt sonst hinein).
export const eingabeKlassen =
  "w-full rounded-sm border border-rahmen bg-grund px-4 text-fg transition-colors duration-150 hover:border-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg aria-invalid:border-fehler";

type Gemeinsam = {
  id: string;
  label: string;
  hinweis?: ReactNode;
  fehler?: string;
};

function Rahmen({
  id,
  label,
  hinweis,
  fehler,
  children,
}: Gemeinsam & { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {children}
      {hinweis ? (
        <p id={`${id}-hinweis`} className="text-sm text-fg-leise">
          {hinweis}
        </p>
      ) : null}
      {fehler ? (
        <p id={`${id}-fehler`} className="text-sm font-medium text-fehler">
          {fehler}
        </p>
      ) : null}
    </div>
  );
}

function beschreibung(g: Gemeinsam): string | undefined {
  return (
    [g.hinweis ? `${g.id}-hinweis` : null, g.fehler ? `${g.id}-fehler` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

export function Feld({
  id,
  label,
  hinweis,
  fehler,
  className,
  ...rest
}: Gemeinsam & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Rahmen id={id} label={label} hinweis={hinweis} fehler={fehler}>
      <input
        id={id}
        className={clsx(eingabeKlassen, "min-h-13", className)}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={beschreibung({ id, label, hinweis, fehler })}
        {...rest}
      />
    </Rahmen>
  );
}

export function Textbereich({
  id,
  label,
  hinweis,
  fehler,
  className,
  ...rest
}: Gemeinsam & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Rahmen id={id} label={label} hinweis={hinweis} fehler={fehler}>
      <textarea
        id={id}
        className={clsx(eingabeKlassen, "min-h-40 py-3", className)}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={beschreibung({ id, label, hinweis, fehler })}
        {...rest}
      />
    </Rahmen>
  );
}
