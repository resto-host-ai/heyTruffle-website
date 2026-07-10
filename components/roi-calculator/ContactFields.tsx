"use client";

import { ContactField } from "./ContactField";
import type { FormState } from "./types";

export function ContactFields({
  state,
  setState,
  onEnter,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  onEnter: () => void;
}) {
  return (
    <div className="mx-auto grid max-w-[480px] gap-6">
      <ContactField
        label="First name"
        value={state.firstName}
        onChange={(v) => setState((p) => ({ ...p, firstName: v }))}
        placeholder="Jane"
        autoFocus
        onEnter={onEnter}
      />
      <ContactField
        label="Email"
        type="email"
        value={state.email}
        onChange={(v) => setState((p) => ({ ...p, email: v }))}
        placeholder="name@example.com"
        onEnter={onEnter}
      />
      <ContactField
        label="Company"
        value={state.company}
        onChange={(v) => setState((p) => ({ ...p, company: v }))}
        placeholder="Acme Corporation"
        onEnter={onEnter}
      />
    </div>
  );
}
