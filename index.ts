import { parse } from "https://deno.land/std/flags/mod.ts";
import {fetchAccessToken} from "./api/fetchAccessToken.ts";

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

console.log(ACCESS_TOKEN)
