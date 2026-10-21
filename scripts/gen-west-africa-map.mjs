// One-off generator for src/components/graphics/west-africa-map-data.ts.
// Needs: npm i --no-save world-atlas@2.0.2 topojson-client@3.1.0 topojson-simplify@3.0.3 d3-geo@3.1.1
// Run from a folder with those installed: node gen-west-africa-map.mjs, then copy west-africa-map.ts across.
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { presimplify, simplify } from "topojson-simplify";
import { geoEquirectangular, geoPath, geoCentroid } from "d3-geo";

const W = 600, H = 480;
const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const simple = simplify(presimplify(topo), 0.0025);
const all = feature(simple, simple.objects.countries).features;
const topo110 = JSON.parse(readFileSync("node_modules/world-atlas/countries-110m.json", "utf8"));
const all110 = feature(topo110, topo110.objects.countries).features;
const WEST = ["Benin", "Burkina Faso", "Cabo Verde", "Côte d'Ivoire", "Gambia", "Ghana", "Guinea", "Guinea-Bissau",
  "Liberia", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal", "Sierra Leone", "Togo"];
// Frame: Cabo Verde to Lake Chad, Gulf of Guinea to the Sahara.
const frame = { type: "MultiPoint", coordinates: [[-25.5, 2.5], [16, 27.5]] };
const proj = geoEquirectangular().fitExtent([[0, 0], [W, H]], frame).clipExtent([[-4, -4], [W + 4, H + 4]]);
const path = geoPath(proj).digits(0);
const pt = (lon, lat) => proj([lon, lat]).map((v) => Math.round(v * 10) / 10);

const inFrame = (f) => { const b = geoPath(proj).bounds(f); return b[1][0] > 0 && b[0][0] < W && b[1][1] > 0 && b[0][1] < H; };
const accra = pt(-0.187, 5.6037);
const west = WEST.map((name) => {
  const f = all.find((x) => x.properties.name === name);
  const c = proj(geoCentroid(f));
  const dist = Math.hypot(c[0] - accra[0], c[1] - accra[1]);
  return { name, d: path(f), dist: Math.round(dist) };
}).sort((a, b) => a.dist - b.dist);
const neighbours = all110.filter((f) => !WEST.includes(f.properties.name) && inFrame(f)).map((f) => path(f)).filter(Boolean);

const out = `// Generated from Natural Earth 1:50m (public domain) via world-atlas@2.0.2. Equirectangular, ${W}×${H}.
// Regenerate with the script in docs/ADMIN.md's sibling note (scripts/README) if the frame changes.
export const MAP_W = ${W};
export const MAP_H = ${H};
export const ACCRA = ${JSON.stringify(accra)} as const;
export const KUMASI = ${JSON.stringify(pt(-1.6244, 6.6885))} as const;
/** West African countries, nearest to Accra first (drives the fill-in order). */
export const WEST_AFRICA: { name: string; d: string }[] = ${JSON.stringify(west.map(({ name, d }) => ({ name, d })))};
/** Surrounding countries, drawn faintly for context. */
export const NEIGHBOURS: string[] = ${JSON.stringify(neighbours)};
`;
writeFileSync("west-africa-map.ts", out);
console.log("bytes", out.length, "accra", accra, "kumasi", pt(-1.6244, 6.6885), "order", west.map((w) => w.name + ":" + w.dist).join(", "), "neighbours", neighbours.length);
