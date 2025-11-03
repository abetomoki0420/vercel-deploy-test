import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    (await auth()).redirectToSignIn();
  }
});

// Keep assets/excluded paths as you had
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
