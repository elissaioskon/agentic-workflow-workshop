import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Speaker } from "@/types/speaker";

import { SpeakerCard } from "./speaker-card";

const speaker: Speaker = {
  name: "Ana Torres",
  sessions: [
    { id: "keynote", title: "The Keynote", startTime: "09:00" },
    { id: "workshop", title: "The Workshop", startTime: "14:30" },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Ana Torres")).toBeInTheDocument();
  });

  it("shows the title and start time of each session", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("The Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("The Workshop")).toBeInTheDocument();
    expect(screen.getByText("14:30")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link", { name: /The Keynote/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/\/sessions\/keynote$/),
    );
    expect(screen.getByRole("link", { name: /The Workshop/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/\/sessions\/workshop$/),
    );
  });
});
