import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "863168956728-l8icfk590dm832cng9ca822dsatcgfnh.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};
