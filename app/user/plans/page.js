import SubscriptionPlans from "@/app/_components/Backend/Subscription/SubscriptionPlans";
import ClientOnly from "@/app/_components/ClientOnly";

export const metadata = {
  title: "Choose Your Plan",
  description:
    "Explore and choose from various subscription plans on MindStacks. Select the plan that best suits your needs and start enjoying our premium features.",
};

function Page() {
  return (
    <ClientOnly>
      <SubscriptionPlans />
    </ClientOnly>
  );
}

export default Page;
