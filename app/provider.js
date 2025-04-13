"use client";

import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { createContext, useEffect, useState } from "react";

// export const userDetailsContext = createContext();

function Provider({ children }) {
  const { user } = useUser();
//   const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    user && isNewUser();
    // user && getUserDetails();
  }, [user]);
  async function isNewUser() {
    const checkResult = await db
      .select()
      .from(users)
      .where(eq(users.email, user.primaryEmailAddress.emailAddress));
    if (!checkResult[0]) {
      await db.insert(users).values({
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl,
      });
    }
  }
//   async function getUserDetails() {
//     const result = await db
//       .select()
//       .from(users)
//       .where(eq(user.primaryEmailAddress.emailAddress, users.email));
//     setUserDetails(result[0]);
//   }

  return (
    // <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <div>{children}</div>
    // </userDetailsContext.Provider>
  );
}

export default Provider;
