import { adminStorage } from "../../keystatic.config";

/**
 * Whether the site admin is usable. Keystatic's local mode writes straight to disk with no login,
 * so outside `next dev` the admin is enabled only in GitHub mode, where every editor signs in with
 * GitHub and needs write access to the repository.
 */
export const adminEnabled = process.env.NODE_ENV === "development" || adminStorage === "github";
