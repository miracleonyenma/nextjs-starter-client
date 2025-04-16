"use client";

import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/gql/graphql";
import { useEffect } from "react";

const Auth: React.FC<{ user?: User | null }> = ({ user }) => {
  const { setUser } = useUserStore();

  // const handleGet

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);
  return null;
};

export default Auth;
