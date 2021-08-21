import React from "react";
import { render } from "@testing-library/react";
import AlertDisplay from "./AlertDisplay";
import { MemoryRouter } from "react-router";

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(<AlertDisplay />)
  });
});