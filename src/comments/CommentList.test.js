import React from "react";
import { render } from "@testing-library/react";
import CommentList from "./CommentList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

const comments = [
  {
    id: 1,
    comment: "Comment with id 1 by user 1",
    commentCreatedAt: "Created At Time Stamp",
    commentLastModified: "Last Modified Time Stamp",
    commenter: {
      id: 1,
      firstName: "Commenter First Name",
      lastName: "Commenter Last Name",
      photoUrl: "url@url.comhttps://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
    }
  }
];
const projectId = 1;

describe("Smoke test", () => {
  test('it renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <CommentList 
            comments={comments} 
            projectId={projectId} 
          />
        </UserProvider>
      </MemoryRouter>
    );
  });
});