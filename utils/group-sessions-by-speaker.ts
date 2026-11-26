import type { Session } from "@/types/session";
import type { Speaker } from "@/types/speaker";

/**
 * The closing panel stores this placeholder in its `speaker` column; it is a
 * label for "everyone", not a person, so it never gets a card.
 */
const LINEUP_PLACEHOLDER = "Full speaker lineup";

/**
 * Groups sessions by speaker. Speakers are sorted by name, and each speaker's
 * sessions by start time ("HH:MM" strings sort chronologically).
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const bySpeaker = new Map<string, Speaker["sessions"]>();

  for (const { id, title, startTime, speaker } of sessions) {
    if (speaker === LINEUP_PLACEHOLDER) continue;

    const speakerSessions = bySpeaker.get(speaker) ?? [];
    speakerSessions.push({ id, title, startTime });
    bySpeaker.set(speaker, speakerSessions);
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions.sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
