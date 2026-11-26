import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns no speakers when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });

  it("sorts speakers by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "z", speaker: "Zoe" }),
      session({ id: "a", speaker: "Ana" }),
      session({ id: "m", speaker: "Marta" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Ana",
      "Marta",
      "Zoe",
    ]);
  });

  it("puts every session of one speaker on a single entry, by start time", () => {
    const speakers = groupSessionsBySpeaker([
      session({
        id: "late",
        title: "Late",
        speaker: "Ana",
        startTime: "15:00",
      }),
      session({ id: "other", speaker: "Bo", startTime: "10:00" }),
      session({
        id: "early",
        title: "Early",
        speaker: "Ana",
        startTime: "09:00",
      }),
    ]);

    expect(speakers).toHaveLength(2);
    expect(speakers[0]).toEqual({
      name: "Ana",
      sessions: [
        { id: "early", title: "Early", startTime: "09:00" },
        { id: "late", title: "Late", startTime: "15:00" },
      ],
    });
  });

  it("does not list the closing panel's placeholder as a speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ speaker: "Ana" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Ana"]);
  });
});
