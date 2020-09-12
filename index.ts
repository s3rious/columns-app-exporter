import { parse } from "https://deno.land/std/flags/mod.ts";
import { writeJson } from "https://deno.land/std/fs/mod.ts";
import { fetchAccessToken } from "./api/fetchAccessToken.ts";
import { fetchProjects } from "./api/fetchProjects.ts";

const args = parse(Deno.args)

const EMAIL = String(args.e)
const PASSWORD = String(args.p)

if (!EMAIL || EMAIL.length < 0) {
  throw new Error(`Email is undefined, you should pass '-e <EMAIL>' argument`)
}

if (!PASSWORD || PASSWORD.length < 0) {
  throw new Error(`Password is undefined, you should pass '-p <PASSWORD>' argument`)
}

const ACCESS_TOKEN = await fetchAccessToken(EMAIL, PASSWORD)

const projects = await fetchProjects(ACCESS_TOKEN)

writeJson(
  "./projects.json",
  projects,
  { spaces: 2 }
)
