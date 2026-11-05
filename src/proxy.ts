import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // API, Next ichki fayllari va nuqtali fayllar (rasm, favicon) proksidan o'tmaydi
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
