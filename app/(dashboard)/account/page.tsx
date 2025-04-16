import { getUser } from "@/app/lib/dal";
import ProfileForm from "@/components/Profile/Form";

const AccountProfile = async () => {
  try {
    const user = (await getUser())?.me;
    if (!user) return <div>Loading...</div>;
    return (
      <div className="wrapper p-4 lg:p-8">
        <ProfileForm user={user} />
      </div>
    );
  } catch (error) {
    console.log("🔴 ~ AccountProfile ~ error", error);
    return (
      <div className="wrapper">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default AccountProfile;
