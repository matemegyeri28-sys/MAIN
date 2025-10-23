import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createMatchPath } from "tsconfig-paths";

const repoRootUrl = new URL("../..", import.meta.url);
const repoRoot = fileURLToPath(repoRootUrl);
const tsconfigPath = resolvePath(repoRoot, "tsconfig.base.json");
const { compilerOptions = {} } = JSON.parse(readFileSync(tsconfigPath, "utf8"));
const { baseUrl = ".", paths = {} } = compilerOptions;
const absoluteBaseUrl = resolvePath(repoRoot, baseUrl);
const matchPath = createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, context, defaultResolve) {
  const matched = matchPath(specifier, undefined, undefined, [
    ".ts",
    ".tsx",
    ".js",
    ".mjs",
    ".cjs",
    ".json"
  ]);
  if (matched) {
    return {
      url: pathToFileURL(matched).href
    };
  }

  return defaultResolve(specifier, context, defaultResolve);
}

export const load = (url, context, defaultLoad) => defaultLoad(url, context, defaultLoad);
