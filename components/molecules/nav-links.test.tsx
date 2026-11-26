import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { NavLinks } from "./nav-links";

const links = [
  { href: "/sessions", label: "Schedule" },
  { href: "/speakers", label: "Speakers" },
];

describe("NavLinks", () => {
  it("marks only the link for the current page", () => {
    render(<NavLinks links={links} pathname="/speakers" />);

    expect(screen.getByRole("link", { name: "Speakers" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Schedule" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("keeps a link active on its sub-pages", () => {
    render(<NavLinks links={links} pathname="/sessions/opening-keynote" />);

    expect(screen.getByRole("link", { name: "Schedule" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
