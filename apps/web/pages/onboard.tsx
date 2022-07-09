/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useRef } from "react";

import { StepperNav } from "ui";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from "ui/chakra-ui";
import { useWatch, useFormContext } from "ui/rhf";
import {
  Field,
  FormLayout,
  FormStep,
  FormStepper,
  FormStepProps,
  FormValue,
  Property,
  PropertyList,
  StepForm,
  StepperCompleted,
  UseFormReturn,
} from "ui/saas-ui";

const WithState = () => {
  const formRef = useRef<UseFormReturn>(null);

  const steps = useMemo<(FormStepProps & { step: () => JSX.Element })[]>(
    () => [
      {
        name: "profile",
        title: "Profile",
        onSubmit: async (data, stepper) => {
          // check email validity
          console.log(data, stepper);

          if (data.email === "exists@saas-ui.dev") {
            formRef.current.setError("email", {
              message: "This email address is already registered.",
            });

            throw new Error("Email exists already");
          }
        },
        step: () => {
          const watch = useWatch();

          console.log(watch);

          return (
            <FormLayout>
              <Field name="name" label="Name" />
              <Field name="email" label="Email" autoComplete="off" />
              <StepperNav />
            </FormLayout>
          );
        },
      },
      {
        name: "password",
        title: "Password",
        step: () => {
          const form = useFormContext();

          console.log(form.getValues("email"));

          return (
            <FormLayout>
              <Field
                name="password"
                label="Password"
                type="password"
                autoFocus
                autoComplete="off"
              />
              <StepperNav />
            </FormLayout>
          );
        },
      },

      {
        name: "confirmation",
        title: "Confirmation",
        step: () => {
          return (
            <FormLayout>
              <Text>Please confirm that your information is correct.</Text>
              <PropertyList>
                <Property label="Name" value={<FormValue name="name" />} />
                <Property label="Email" value={<FormValue name="email" />} />
              </PropertyList>
              <StepperNav />
            </FormLayout>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <StepForm
        ref={formRef}
        defaultValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(d) => {
          console.log("submit", d);
        }}
      >
        <FormLayout>
          <FormStepper>
            {steps.map(({ step: Step, name, ...rest }) => (
              <FormStep key={name} name={name} {...rest}>
                <Step />
              </FormStep>
            ))}

            <StepperCompleted>
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <AlertTitle>Thanks for signing up</AlertTitle>
                  <AlertDescription width="full">
                    Check your inbox to confirm your email address.
                  </AlertDescription>
                </Box>
              </Alert>
            </StepperCompleted>
          </FormStepper>
        </FormLayout>
      </StepForm>
    </>
  );
};

export default WithState;
