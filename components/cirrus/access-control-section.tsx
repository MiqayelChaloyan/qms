import Image from "next/image";
import { Words } from "@/components/cirrus/reveal";
import styles from "@/components/cirrus/styles.module.css";

const ACTIONS = ["View", "Add", "Edit", "Delete", "Approve"];

const ROLES = [
  { role: "Laboratory director", grants: [true, true, true, true, true] },
  { role: "Quality manager", grants: [true, true, true, true, true] },
  { role: "Supervisor", grants: [true, true, true, false, true] },
  { role: "Technologist", grants: [true, true, false, false, false] },
];

const POINTS = [
  "Full control over users and permissions",
  "Access levels based on roles",
  "Designate approval authorities",
];

export function AccessControlSection() {
  return (
    <section id="access-control" className={`${styles.section} ${styles.mist}`}>
      <div className={styles.container}>
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div>
            <p data-rise className={styles.eyebrow}>
              Roles and permissions
            </p>
            <h2 className={`${styles.title} ${styles.titleXL}`}>
              <Words text="Access Control" />
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {POINTS.map((point) => (
              <li
                key={point}
                data-rise
                className="rounded-full bg-white px-4 py-2 text-sm text-[#180061]/80 ring-1 ring-[#180061]/10"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid items-center gap-8 md:mt-14 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div data-rise className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_60px_-32px_rgba(24,0,97,0.35)] ring-1 ring-[#180061]/10">
            <div className="flex items-center justify-between border-b border-[#180061]/10 px-6 py-4">
              <p className="font-display text-base font-medium text-[#180061]">Permissions by role</p>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#180061]/45 uppercase">Example</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-left">
                <thead>
                  <tr className="font-mono text-[10px] tracking-[0.18em] text-[#180061]/50 uppercase">
                    <th className="px-6 py-3 font-normal">Role</th>
                    {ACTIONS.map((action) => (
                      <th key={action} className="px-2 py-3 text-center font-normal">
                        {action}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((row) => (
                    <tr
                      key={row.role}
                      className="border-t border-[#180061]/8 transition-colors duration-300 hover:bg-[#6600ff]/[0.05]"
                    >
                      <td className="px-6 py-4 text-sm text-[#180061]">{row.role}</td>
                      {row.grants.map((granted, i) => (
                        <td key={ACTIONS[i]} className="px-2 py-4 text-center">
                          <span
                            aria-label={granted ? "Allowed" : "Not allowed"}
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                              granted ? "bg-[#6600ff] text-white" : "bg-[#180061]/[0.06] text-[#180061]/30"
                            }`}
                          >
                            {granted ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                                <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <span className="h-[1.5px] w-2 rounded-full bg-current" />
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            data-wipe
            className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_60px_-32px_rgba(24,0,97,0.42)] ring-1 ring-[#180061]/10"
          >
            <Image
              src="/assetss/qmspad-Access-control-1024x735.avif"
              alt="Access control screens for user roles and module permissions."
              width={828}
              height={594}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 40rem, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
