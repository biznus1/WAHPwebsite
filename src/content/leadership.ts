/**
 * Leadership entries. Per owner direction, the public site shows name, title
 * and LinkedIn only (no biographies). Nobody is rendered until the owner
 * confirms their current title and consent — set `publicApproved: true` then.
 * Pending names and title conflicts are listed in docs/CONTENT_APPROVAL.md.
 */
export interface Leader {
  name: string;
  title: string;
  linkedin?: string;
  publicApproved: boolean;
}

export const leaders: Leader[] = [];
