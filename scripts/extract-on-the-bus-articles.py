from pathlib import Path
import json
from docx import Document

SOURCE = Path(r"C:\Users\subra\Downloads\52_Orchs\On the Bus to Contest.docx")
OUTPUT = Path("content/articles/onTheBusArticleContent.ts")

doc = Document(SOURCE)
paragraphs = [p.text.replace("\r", "").strip() for p in doc.paragraphs]

# These ranges end immediately before the next standalone article. The book starts
# at paragraph 2519 ("BEFORE THE FIRST NOTE") and is intentionally excluded.
articles = [
    ("job-not-perfect", "Your Job Is Not to Be Perfect", 14, 322),
    ("calm-your-mind", "7 Ways to Calm Your Mind Before the Contest", 322, 580),
    ("quiet-before-first-note", "The Quiet Before the First Note: What Meditation Can Give You Before a Marching Band Contest", 580, 845),
    ("laughter-best-medicine", "Laughter May Be the Best Medicine for a Nervous Condition Before You Perform", 845, 1303),
    ("your-season-in-your-pocket", "Your Season in Your Pocket: A Band-Bus Diary for the Ride to Contest", 1303, 1710),
    ("person-beside-you", "The Person Beside You May Need You", 1710, 2116),
    ("director-seems-different", "Your Director Seems Different Today—There’s a Reason", 2116, 2519),
]

heading_indexes = {
    14: {15, 41, 89, 126, 161, 179, 217, 243},
    322: {323, 344, 368, 391, 416, 440, 478, 508, 529},
    580: {581, 582, 606, 630, 667, 717, 751, 797},
    845: {846, 872, 898, 906, 927, 973, 991, 1022, 1048, 1074, 1098, 1154},
    1303: {1304, 1347, 1354, 1383, 1412, 1442, 1488, 1515, 1541, 1563, 1597, 1631},
    1710: {1735, 1770, 1798, 1823, 1847, 1871, 1891, 1917},
    2116: {2149, 2182, 2206, 2231, 2289, 2312, 2331, 2368, 2394, 2430},
}

def clean(text: str) -> str:
    return (text.replace("�", "’").replace("\u0092", "’").replace("\u0093", "“").replace("\u0094", "”"))

payload = {}
for slug, title, start, end in articles:
    items = []
    for index in range(start + 1, end):
        text = clean(paragraphs[index])
        if not text:
            continue
        items.append({"type": "heading" if index in heading_indexes[start] else "paragraph", "text": text})
    payload[slug] = {"title": clean(title), "sections": items}

OUTPUT.write_text(
    "export type ArticleSection = { type: 'heading' | 'paragraph'; text: string };\n"
    "export type OnTheBusArticle = { title: string; sections: ArticleSection[] };\n\n"
    f"export const onTheBusArticleContent: Record<string, OnTheBusArticle> = {json.dumps(payload, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
