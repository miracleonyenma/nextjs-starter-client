import { useUserStore } from "@/store/useUserStore";
import getMe from "@/utils/auth/me";

const useAuth = () => {
  const { user, setUser } = useUserStore();
  const handleGetMe = async () => {
    const user = await getMe();
    if (user?.me) {
      setUser(user?.me);
      return user?.me;
    }
  };

  return { user, setUser, handleGetMe };
};

export default useAuth;
