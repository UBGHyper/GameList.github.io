#!/usr/bin/env python3
import csv, re, sys, time, hashlib
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
from urllib.request import Request, urlopen
from html.parser import HTMLParser

ROOT = Path.cwd()
DONE = {"10-Minutes-Till-Dawn", "Buckshot-Roulete", "Minecraft"}
SKIP = (
    "google-analytics", "googletagmanager", "doubleclick",
    "adsense", "analytics", "tag.atom.gamedistribution",
    "game.api.gamedistribution", "api.eponesh", "t.poki.io",
    "headerlift", "browsehappy"
)
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 10
MAX_DEPTH = 3
TIMEOUT = 12

class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)

        if tag == "script":
            keys = ("src",)
        elif tag == "link":
            rel = a.get("rel", "").lower().split()
            keys = ("href",) if any(
                x in rel for x in ("stylesheet", "icon", "preload", "modulepreload")
            ) else ()
        elif tag in ("img", "iframe", "source", "audio", "video", "track", "embed"):
            keys = ("src", "poster")
        elif tag == "object":
            keys = ("data",)
        else:
            keys = ()

        for key in keys:
            if a.get(key):
                self.urls.append(a[key])

        if tag in ("img", "source") and a.get("srcset"):
            self.urls.extend(
                x.strip().split()[0] for x in a["srcset"].split(",") if x.strip()
            )

def skipped(url):
    u = url.lower()
    return (u.startswith(("data:", "javascript:", "mailto:", "#"))
            or any(x in u for x in SKIP))

def fetch(url):
    req = Request(url, headers={"User-Agent": "OfflineGameMirror/1.0"})
    with urlopen(req, timeout=TIMEOUT) as r:
        return r.read(), r.headers.get_content_type()

def local_path(base, url):
    u = urlparse(url)
    path = unquote(u.path).lstrip("/") or "index.html"
    if path.endswith("/"):
        path += "index.html"
    # Keep different hosts and query variants separate.
    if u.query:
        suffix = hashlib.sha1(u.query.encode()).hexdigest()[:10]
        p = Path(path)
        path = str(p.with_name(p.stem + "-" + suffix + p.suffix))
    return base / "_assets" / u.netloc / path

def mirror_game(game, url):
    base = ROOT / game / "offline"
    if base.exists():
        print(f"SKIP {game}: offline/ already exists")
        return

    base.mkdir(parents=True)
    visited = set()
    count = 0
    errors = []
    replacements = {}

    def save_resource(target_url, depth=0, destination=None):
        nonlocal count
        if skipped(target_url) or target_url in visited or depth > MAX_DEPTH:
            return None
        visited.add(target_url)

        try:
            data, mime = fetch(target_url)
            dest = destination or local_path(base, target_url)
            dest.parent.mkdir(parents=True, exist_ok=True)

            # Rewrite references inside HTML and CSS files.
            if mime in ("text/html", "text/css") or dest.suffix.lower() in (".html", ".css"):
                content = data.decode("utf-8", errors="replace")
                refs = []

                if mime == "text/html" or dest.suffix.lower() == ".html":
                    parser = Refs()
                    parser.feed(content)
                    refs = parser.urls
                else:
                    refs = re.findall(
                        r'''url\(\s*["']?([^"')]+)''', content, re.I
                    )
                    refs += re.findall(
                        r'''@import\s+["']([^"']+)''', content, re.I
                    )

                for ref in set(refs):
                    if skipped(ref):
                        continue
                    absolute = urljoin(target_url, ref)
                    parsed = urlparse(absolute)
                    if parsed.scheme not in ("http", "https"):
                        continue

                    child = save_resource(absolute, depth + 1)
                    if child:
                        relative = Path(
                            __import__("os").path.relpath(
                                child, dest.parent
                            )
                        ).as_posix()
                        content = content.replace(ref, relative)

                data = content.encode("utf-8")

            dest.write_bytes(data)
            count += 1
            replacements[target_url] = dest
            return dest

        except Exception as e:
            errors.append((target_url, str(e)))
            return None

    print(f"\n=== {game} ===")
    page = save_resource(url, destination=base / "index.html")
    if page:
        print(f"Downloaded {count} files")
    else:
        print("FAILED to download game page")

    if errors:
        print(f"Warnings: {len(errors)}")
        for u, e in errors[:5]:
            print(f"  {u}: {e}")

    # Save a per-game report.
    report = base / "offline-report.txt"
    report.write_text(
        f"Game: {game}\nSource: {url}\nFiles: {count}\n"
        f"Warnings: {len(errors)}\n\n" +
        "\n".join(f"{u}\n  {e}" for u, e in errors)
    )

    print(f"Saved: {base}")

with open(ROOT / "offline-resources.csv", newline="") as f:
    rows = list(csv.DictReader(f))

games = {}
for r in rows:
    if r["type"] == "iframe" and r["game"] not in DONE:
        games.setdefault(r["game"], r["url"])

selected = list(games.items())[:LIMIT]
print(f"Batch size: {len(selected)} games")
for game, url in selected:
    mirror_game(game, url)
    time.sleep(0.2)

print("\nBatch finished. Original launchers were NOT changed.")
