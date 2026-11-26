import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SpeakersPage from "./page";

const { fetchSessions } = vi.hoisted(() => ({ fetchSessions: vi.fn() }));

vi.mock("@/services/sessions", () => ({ fetchSessions }));
vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
  setRequestLocale: vi.fn(),
}));

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

async function renderPage() {
  render(await SpeakersPage({ params: Promise.resolve({ locale: "en" }) }));
}

describe("SpeakersPage", () => {
  beforeEach(() => fetchSessions.mockReset());

  it("shows a message instead of an empty grid when there are no speakers", async () => {
    fetchSessions.mockResolvedValue([]);

    await renderPage();

    expect(screen.getByText("empty")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("lists one card per speaker, each titled by a level 2 heading", async () => {
    fetchSessions.mockResolvedValue([
      session({ id: "one", speaker: "Bo" }),
      session({ id: "two", speaker: "Ana" }),
      session({ id: "three", speaker: "Ana" }),
    ]);

    await renderPage();

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Ana", "Bo"]);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("does not show the closing panel's placeholder as a speaker", async () => {
    fetchSessions.mockResolvedValue([
      session({ speaker: "Ana" }),
      session({ id: "closing", speaker: "Full speaker lineup" }),
    ]);

    await renderPage();

    expect(screen.queryByText("Full speaker lineup")).not.toBeInTheDocument();
  });
});
