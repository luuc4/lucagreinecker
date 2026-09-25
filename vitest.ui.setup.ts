// Setup des Vitest-Projekts `ui`: Testing Library räumt das DOM nur dann
// automatisch nach jedem Test auf, wenn `afterEach` global ist. Ohne
// Vitest-Globals passiert das hier, sonst stapeln sich die Renderings.
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
