'use client'

import { Button } from "@/components/ui/button";
import { ClientPartOfPricingPageButtonProps } from "@/types";

const PricingButton = ({planId} : ClientPartOfPricingPageButtonProps ) => {
  const handlePurchase = async (planId: string) => {
    console.log("Selected plan:", planId);
  };

  return (
    <Button
      onClick={() => handlePurchase(planId)}
      className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-sm rounded-md transition-all"
    >
      Buy Now
    </Button>
  );
};

export default PricingButton;
