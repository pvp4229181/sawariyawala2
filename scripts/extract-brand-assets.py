"""Extracts web-ready local assets from the supplied Sawariyawala brand PDF."""
from pathlib import Path
from PIL import Image
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
PDF = Path(r"C:\Users\Lenovo\Downloads\LBS.pdf")
GEN_HERO = Path(r"C:\Users\Lenovo\.codex\generated_images\01a09741-736e-7493-b8b1-4578fa634aaa\exec-c7d2dcd3-3390-4801-bcb0-cd55125be891.png")
BRAND = ROOT / "public/assets/brand"
EDITORIAL = ROOT / "public/assets/editorial"
FOOD = ROOT / "public/assets/food"
for folder in (BRAND, EDITORIAL, FOOD):
    folder.mkdir(parents=True, exist_ok=True)

doc = pymupdf.open(PDF)

def extract(xref: int) -> Image.Image:
    payload = doc.extract_image(xref)
    return Image.open(__import__('io').BytesIO(payload['image'])).convert('RGB')

def webp(image: Image.Image, target: Path, size=None):
    if size:
        image.thumbnail(size, Image.Resampling.LANCZOS)
    image.save(target, 'WEBP', quality=88, method=6)

# Approved logo (PDF xref 66). Remove the warm-cream page background for web use.
logo = extract(66).convert('RGBA')
pixels = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, _ = pixels[x, y]
        if r > 235 and g > 228 and b > 215:
            pixels[x, y] = (r, g, b, 0)
logo.save(BRAND / 'logo-primary.png', optimize=True)
logo.crop((245, 0, 890, 575)).save(BRAND / 'logo-mark.png', optimize=True)

# PDF editorial artwork and supplied visualizations.
editorial_map = {
    8: 'story-stall.webp',
    14: 'quality-banner.webp',
    23: 'packaging.webp',
    27: 'story-cook.webp',
    31: 'menu-hero.webp',
    35: 'hospitality.webp',
    84: 'navy-feather-background.webp',
}
for xref, filename in editorial_map.items():
    webp(extract(xref), EDITORIAL / filename, (1800, 1800))

webp(Image.open(GEN_HERO).convert('RGB'), EDITORIAL / 'home-hero.webp', (2048, 1200))
webp(extract(35), EDITORIAL / 'why-us-hero.webp', (1600, 1200))
webp(extract(8), EDITORIAL / 'contact-hero.webp', (1600, 1200))

# Product imagery is derived from the food illustrations in the supplied menu/storefront.
store = extract(31)
menu = extract(18)
store_crops = {
    'samosa.webp': (210, 510, 545, 900),
    'dhokla.webp': (455, 560, 780, 930),
    'pav-bhaji.webp': (205, 760, 665, 1150),
    'gol-gappe.webp': (550, 740, 970, 1140),
}
menu_crops = {
    'kachori.webp': (25, 205, 325, 530),
    'vada-pav.webp': (340, 205, 720, 535),
    'chaat.webp': (20, 490, 335, 840),
    'beverages.webp': (330, 485, 740, 845),
}
masters = {}
for name, box in store_crops.items():
    masters[name] = store.crop(box).resize((900, 720), Image.Resampling.LANCZOS)
for name, box in menu_crops.items():
    masters[name] = menu.crop(box).resize((900, 720), Image.Resampling.LANCZOS)

asset_sources = {
    'samosa.webp': 'samosa.webp', 'kachori.webp': 'kachori.webp',
    'aloo-vada.webp': 'samosa.webp', 'cheese-vada.webp': 'vada-pav.webp',
    'bread-roll.webp': 'vada-pav.webp', 'dhokla.webp': 'dhokla.webp',
    'dhokla-chaat.webp': 'chaat.webp', 'bhel.webp': 'chaat.webp',
    'sev-puri.webp': 'gol-gappe.webp', 'pav-bhaji.webp': 'pav-bhaji.webp',
    'vada-pav.webp': 'vada-pav.webp', 'dabeli.webp': 'vada-pav.webp',
    'misal-pav.webp': 'pav-bhaji.webp', 'masala-chai.webp': 'beverages.webp',
    'fresh-lime.webp': 'beverages.webp', 'cold-coffee.webp': 'beverages.webp',
    'mocktail.webp': 'beverages.webp',
}
for target, source in asset_sources.items():
    webp(masters[source].copy(), FOOD / target)

print(f'Created {len(asset_sources) + len(editorial_map) + 5} local web assets.')
