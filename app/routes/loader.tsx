import { LoaderFunction } from "@remix-run/node";
import { getUserToken } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);
  if (accessToken) return redirect("/");
  return {};
};
