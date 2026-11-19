import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth",
  publicRoutes: [
    "/",
    "/projects",
    "/blogs",
    "/about",
    "/contact",
    "/api/storage",
    "/api/contact",
  ],
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
