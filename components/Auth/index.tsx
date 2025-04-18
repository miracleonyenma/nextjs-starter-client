// ./components/Auth/index.tsx

"use client";

import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/gql/graphql";
import getMe from "@/utils/auth/me";
import { useEffect } from "react";

const Auth: React.FC<{ user?: User | null }> = ({ user }) => {
  const { setUser } = useUserStore();

  // const handleGet

  useEffect(() => {
    if (user) setUser(user);
    else {
      const handleGetMe = async () => {
        const user = await getMe();
        if (user?.me) setUser(user?.me);
      };
      handleGetMe();
    }
  }, [user]);
  return null;
};

export default Auth;
