import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small side projects.",
      quota: 10,
      features: [
        {
          text: "5 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "4MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
      features: [
        {
          text: "25 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "16MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
        {
          text: "Priority support",
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper className=" mb-8 mt-24 text-center max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className=" text-6xl  font-bold sm:text-7xl">Pricing</h1>
          <p className=" mt-5 text-gray-600 sm:text-lg">
            Whether you&apos;re just starting out or looking to scale up your
            operations, we have a plan for you. Our pricing is designed to be as
            flexible and affordable as possible. You can start with our free
            tier, then upgrade whenever you want.
          </p>
        </div>
        <div className=" pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find((p) => p.slug === plan.toLocaleLowerCase())?.price
                  .amount || 0;
                  return <div key={plan} className={cn("relative rounded-2xl  bg-white shadow-lg",{
                    "border-2 border-orange-600 shadow-orange-500":plan=== "Pro",
                    "border border-gray-200":plan !== "Pro"
                  })}>
                    {plan ===  "Pro" && (
                        <div className=" absolute -top-5 left-0 right-0 mx-auto  w-32 rounded-full bg-gradient-to-r  from-orange-600  to-red-500  px-3 py-2 text-sm font-medium text-white">
                            Upgrade Now ! !🌟✨

                        </div>
                    )}
                  </div>
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
