import React from "react";
import { render } from "@testing-library/react";
import Homepage from "./Homepage";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(<MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>)
  });
});
