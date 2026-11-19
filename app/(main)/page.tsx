import { HomeView } from "@/components/home-view";
import { getUserProfileAction } from "@/lib/neon.actions";

export default async function HomePage() {
  let initialProfile = null;
  try {
    initialProfile = await getUserProfileAction();
  } catch {
    // Client hook will retry if needed
  }

  return <HomeView initialProfile={initialProfile} />;
}
