import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(<LoginForm />)
  })
});


it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
