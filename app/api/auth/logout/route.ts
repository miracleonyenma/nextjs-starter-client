import { deleteSession } from "@/app/lib/session";
import { cookies } from "next/headers";

const GET = async () => {
  try {
    deleteSession();
    (await cookies()).set("accessToken", "", { expires: new Date() });
    (await cookies()).set("refreshToken", "", { expires: new Date() });
    (await cookies()).set("user", "", { expires: new Date() });

    return Response.json({ success: true });
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ error", error);
    return new Response((error as Error).message, { status: 500 });
  }
};

export { GET };
