import { ButtonGroup, Spacer } from "@chakra-ui/react";
import { useStepFormContext, PrevButton, NextButton, NextButtonProps } from "@saas-ui/react";

export const StepperNav = (props: NextButtonProps) => {
  const { isFirstStep } = useStepFormContext();

  return (
    <ButtonGroup width="full">
      {!isFirstStep && <PrevButton variant="ghost" />}
      <Spacer />
      <NextButton submitLabel="Confirm" {...props} />
    </ButtonGroup>
  );
};
