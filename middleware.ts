import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/', "/teams", "/schedule","/api(.)*", "/api/webhook"],
  ignoredRoutes:[
    "/api/webhook",
]
});
 
export const config = {

  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};