import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");
  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);
  return NextResponse.json({
    message: "revalidate success",
  });
};
