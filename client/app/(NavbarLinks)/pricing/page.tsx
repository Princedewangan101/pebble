
import PricingButton from "@/components/mycompo/PricingButton";
import { CheckIcon } from "lucide-react";

const PricingPage = () => {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$7",
      credits: 150,
      description:
        "Perfect for individuals exploring creative tools for the first time.",
      features: [
        "Up to 30 Generations",
        "Access to Core Templates",
        "Essential AI Models",
        "Email-only Support",
        "Basic Performance Insights",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      price: "$25",
      credits: 600,
      description:
        "Designed for growing creators who need more flexibility and power.",
      features: [
        "Up to 120 Generations",
        "Custom Template Builder",
        "Pro AI Models",
        "Priority Email Support",
        "Detailed Performance Reports",
      ],
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$79",
      credits: 1600,
      description:
        "Built for teams and businesses requiring maximum output and reliability.",
      features: [
        "Up to 350 Generations",
        "Team Collaboration Tools",
        "Premium AI Models",
        "24/7 Chat + Email Support",
        "Full Analytics Suite",
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl h-[80vh] mx-auto z-20 max-md:px-4">
      <div className="h-full pt-14 py-4 px-4">
        <div className="flex items-center h-full gap-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="p-6 bg-black/20 ring ring-indigo-950 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg hover:ring-indigo-500 transition-all duration-400"
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>

              <div className="my-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-300"> / {plan.credits} credits</span>
              </div>

              <p className="text-gray-300 mb-6">{plan.description}</p>

              <ul className="space-y-1.5 mb-6 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon size={18}/>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

                <PricingButton planId={plan.id} />

            </div>
          ))}
        </div>
        <p>Pricing</p>
      </div>
    </div>
  );
};

export default PricingPage;
