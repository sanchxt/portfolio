import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EMAIL, mailto } from "@/data/site";

const SUBJECT = "AI engineering opportunity";

export const MessageBox = () => {
  const [message, setMessage] = useState("");

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = mailto(SUBJECT, message);
      }}
    >
      <label htmlFor="message" className="t-label text-faint">
        Your message
      </label>
      <textarea
        id="message"
        value={message}
        rows={5}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="What are you building, and where could AI help?"
        className="w-full resize-y rounded-room border border-line bg-surface p-4 text-base outline-none placeholder:text-faint focus:border-ink"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Or email me at{" "}
          <a href={mailto(SUBJECT)} className="break-all underline underline-offset-4">
            {EMAIL}
          </a>
        </p>
        <button
          type="submit"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-room bg-accent px-6 font-medium text-on-accent transition-colors duration-150 hover:bg-accent-hover hover:text-on-accent-hover"
        >
          Send message
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
