import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      //public route가 아닌곳에 로그인되지 않은 사용자가 접근한 경우
      //signIn으로 redirect시키고, 어느곳에 방문하려 했는지(req.url)를 함께 전송함
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
