import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  id: 1,
  username: "testuser",
  firstName: "testfirst",
  lastName: "testlast",
  bio: "This is my bio",
  email: "test@test.net",
  photoUrl: null,
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
