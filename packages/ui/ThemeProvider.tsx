import { ModalsProvider, SaasProvider, NProgressNextRouter } from "@saas-ui/react";
import React from "react";

interface ThemeProviderProps extends React.ComponentProps<typeof SaasProvider> {
  router: any;
}

export const ThemeProvider = ({ children, theme, linkComponent, router }: ThemeProviderProps) => {
  return (
    <SaasProvider theme={theme} linkComponent={linkComponent}>
      <ModalsProvider>
        <NProgressNextRouter router={router} />
        {children}
      </ModalsProvider>
    </SaasProvider>
  );
};
