import type { ReactNode } from "react";
import styles from "@/components/cirrus/styles.module.css";

export function ModuleSplit({
  id,
  eyebrow,
  title,
  children,
  media,
  mediaFirst = false,
  tone = "mist",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  media: ReactNode;
  mediaFirst?: boolean;
  tone?: "mist" | "white";
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`}>
      <div className={`${styles.container} ${styles.split} ${mediaFirst ? styles.mediaFirst : ""}`}>
        <div className={styles.copy}>
          <p data-rise className={styles.eyebrow}>
            {eyebrow}
          </p>
          <h2 className={styles.title}>{title}</h2>
          <div className="mt-7 max-w-md">{children}</div>
        </div>
        <div className={styles.media}>{media}</div>
      </div>
    </section>
  );
}

export function ModulePoints({ items }: { items: string[] }) {
  return (
    <ul className={styles.points}>
      {items.map((point) => (
        <li key={point} data-rise className={styles.point}>
          {point}
        </li>
      ))}
    </ul>
  );
}

export const shotClass = styles.shot;
export const overlapClass = styles.overlap;
