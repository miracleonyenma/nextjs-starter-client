import { getUser } from "@/lib/dal";
import ProfileForm from "@/components/Profile/Form";
import { logger } from "@untools/logger";

export const dynamic = "force-dynamic";

const AccountProfile = async () => {
  try {
    const user = (await getUser())?.me;
    return (
      <div className="wrapper p-4 lg:p-8">
        <ProfileForm user={user || undefined} />
      </div>
    );
  } catch (error) {
    logger.error("🔴 ~ AccountProfile ~ error", error);
    return (
      <div className="wrapper">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default AccountProfile;
