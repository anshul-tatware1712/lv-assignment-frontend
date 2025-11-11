"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const redirectUri =
    typeof window !== "undefined" ? `${window.location.origin}/profile` : "";

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
