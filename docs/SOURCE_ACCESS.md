# Source access log (20 Oct 2026)

| Source | Access | Notes |
| --- | --- | --- |
| Brand Guidelines v1.0 PDF (owner attachment) | ✅ Read all 24 pages | Governs visual identity |
| Owner build brief (`WAHP_CLAUDE_CODE_WEBSITE_BUILD.md`) | ✅ | Primary instructions |
| https://www.westahp.com/ (+ /about, /founders, /contact-us) | ❌ **Blocked** | This environment's network policy denied the host (proxy 403 / DNS failure). Not audited. See `research/SITE_AUDIT_RAW.md` |
| https://wahp.kwasimd.chatgpt.site/ | ❌ **Blocked** | Same network restriction |
| Google Drive (owner connector, read-only) | ✅ | Logo files, Brand PDF, One-Pager, Questionnaire, Master Brief, homepage/contact blueprints, decks, Team Bios (list only), website photos folder (listed), concept renders (downloaded). Nothing on Drive was modified |
| Mobbin MCP | ✅ | 8 pattern areas studied, see `research/MOBBIN_NOTES.md` |
| lina.co, aruwacapital.com, suitesbynylo.com | ❌ | Same network restriction. Not studied |

**To unblock the site audit:** add `www.westahp.com`, `westahp.com` and `wahp.kwasimd.chatgpt.site` to *Allowed domains* under the cloud environment's **Network access** settings (https://code.claude.com/docs/en/cloud-environments#network-access), or save the pages (HTML/PDF/screenshots) into `docs/research/source/`.

Private Drive material was used for direction only. The repository contains only public-safe content and the owner's brand and concept assets. The full Drive report stayed in a temporary scratch area and was not committed.
