"""Search Wikimedia Commons for freely licensed photos and save thumbnails + licence metadata.
Usage: python3 -I scripts/commons-search.py <outDir> <query> [<query> ...]"""
import json, sys, time, urllib.parse, urllib.request, os, re

UA = {"User-Agent": "WAHPWebsiteBuild/1.0 (staging build; contact info@westahp.com)"}
OK = re.compile(r"^(cc0|public domain|pd|cc by(-sa)? ?\d|cc-by(-sa)?-\d)", re.I)

def api(params):
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({**params, "format": "json"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return json.load(r)
        except Exception:
            time.sleep(3 * (attempt + 1))
    return {}

out, queries = sys.argv[1], sys.argv[2:]
os.makedirs(out, exist_ok=True)
manifest_path = os.path.join(out, "manifest.json")
manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
for q in queries:
    data = api({
        "action": "query", "generator": "search", "gsrsearch": f"{q} filetype:bitmap", "gsrnamespace": 6,
        "gsrlimit": 25, "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 480,
    })
    pages = (data.get("query") or {}).get("pages", {})
    n = 0
    for p in pages.values():
        ii = (p.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        lic = (meta.get("LicenseShortName", {}) or {}).get("value", "")
        if not OK.match(lic) or ii.get("width", 0) < 1200:
            continue
        key = str(p["pageid"])
        if key in manifest:
            continue
        thumb = ii.get("thumburl")
        try:
            with urllib.request.urlopen(urllib.request.Request(thumb, headers=UA), timeout=30) as r:
                open(os.path.join(out, key + ".jpg"), "wb").write(r.read())
        except Exception:
            continue
        artist = re.sub("<[^>]+>", "", (meta.get("Artist", {}) or {}).get("value", "")).strip()
        manifest[key] = {
            "title": p["title"], "query": q, "license": lic, "artist": artist,
            "w": ii.get("width"), "h": ii.get("height"), "url": ii.get("url"),
            "page": ii.get("descriptionurl"),
            "desc": re.sub("<[^>]+>", "", (meta.get("ImageDescription", {}) or {}).get("value", ""))[:200],
        }
        n += 1
        time.sleep(0.5)
    print(q, "->", n)
    time.sleep(2)
json.dump(manifest, open(manifest_path, "w"), indent=1)
print("total", len(manifest))
