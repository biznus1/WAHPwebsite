import { teamMembers, type TeamMember } from "./editable";

/**
 * Core team, copied at the owner's instruction (21 Oct 2026) from the team page of
 * the latest WAHP site build (wahp.viewyourprojecthere.com/team). That site's
 * advisory-board cards are unfilled placeholders, so no advisors are listed.
 * LinkedIn URLs come from the founders page of westahp.com (/founders-1), except
 * Jonathan Francois (both sites agree). No public profile was found for Nakeitheya Smith.
 *
 * Edited in the site admin (Leadership team), stored in data/team.json.
 * Untick "Show on the website" to hide anyone.
 */
export type Leader = TeamMember;

export const leaders: Leader[] = teamMembers;

export const approvedLeaders = leaders.filter((l) => l.show);
