import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

const projectId = 1;

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <CommentForm projectId={projectId} />
        </UserProvider>
      </MemoryRouter>
    );
  });
});