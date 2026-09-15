from PIL import Image, ImageDraw
import os

source_path = "public/media/logo.png"
public_dir = "public"

img = Image.open(source_path).convert("RGBA")
width, height = img.size

# We want the icon to look crisp and clear at all resolutions.
# The logo has a rounded glass squircle. Let's make a version with rounded corner alpha mask
# so it blends seamlessly into both light and dark browser tab bars.

# Create smooth rounded rectangle mask
corner_radius = int(width * 0.22) # ~275px radius on 1254px image matches the squircle curvature
mask = Image.new("L", (width, height), 0)
draw = ImageDraw.Draw(mask)
# Inset slightly to clip outer background outside the glass squircle
margin = int(width * 0.08) # ~100px margin insets right to the squircle edge
draw.rounded_rectangle(
    [(margin, margin), (width - margin, height - margin)],
    radius=int((width - 2 * margin) * 0.26),
    fill=255
)

# Apply mask to alpha channel
r, g, b, a = img.split()
# Combine original alpha with rounded mask
import math

# Crop to the squircle content with tiny breathing room
crop_box = (margin, margin, width - margin, height - margin)
cropped_img = img.crop(crop_box)
cropped_mask = mask.crop(crop_box)

squircle_icon = Image.new("RGBA", cropped_img.size, (0, 0, 0, 0))
squircle_icon.paste(cropped_img, (0, 0), cropped_mask)

# Save high-res PNGs
sizes = {
    "favicon-96x96.png": (96, 96),
    "apple-touch-icon.png": (180, 180),
    "web-app-manifest-192x192.png": (192, 192),
    "web-app-manifest-512x512.png": (512, 512),
}

for filename, size in sizes.items():
    resized = squircle_icon.resize(size, Image.Resampling.LANCZOS)
    out_path = os.path.join(public_dir, filename)
    resized.save(out_path, format="PNG")
    print(f"Generated {out_path} ({size[0]}x{size[1]})")

# Generate multi-resolution favicon.ico (16x16, 32x32, 48x48)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = [squircle_icon.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
ico_path = os.path.join(public_dir, "favicon.ico")
ico_images[0].save(
    ico_path,
    format="ICO",
    sizes=ico_sizes,
    append_images=ico_images[1:]
)
print(f"Generated {ico_path} with sizes {ico_sizes}")

# Also generate a standalone 32x32 favicon.png for browsers that prefer PNG favicon
favicon_32 = squircle_icon.resize((32, 32), Image.Resampling.LANCZOS)
favicon_32.save(os.path.join(public_dir, "favicon-32x32.png"), format="PNG")
favicon_16 = squircle_icon.resize((16, 16), Image.Resampling.LANCZOS)
favicon_16.save(os.path.join(public_dir, "favicon-16x16.png"), format="PNG")
print("Generated favicon-32x32.png and favicon-16x16.png")
