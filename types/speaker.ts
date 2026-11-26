import type { Session } from "./session";

/** A speaker and the sessions they give, as the Speakers page shows them. */
export interface Speaker {
  name: string;
  sessions: Pick<Session, "id" | "title" | "startTime">[];
}
