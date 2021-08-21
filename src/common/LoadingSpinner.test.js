import React from "react";
import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";
import { MemoryRouter } from "react-router";

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(<LoadingSpinner />)
  });
});