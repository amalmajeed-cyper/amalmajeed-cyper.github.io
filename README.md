# Forgex Media Website - Asset & Customization Guide

Welcome to the Forgex Media website codebase! Below are the instructions on how to customize this website and upload your own high-quality photography and videography assets.

## Setting Up Your Portfolio Assets

We have configured the website to load assets from the `assets/` directory. To display your custom photos and videos, simply replace the placeholder files inside `assets/` with your own assets using the exact filenames and recommendations below:

### 1. Hero Cover Background
- **Filename**: `hero-bg.jpg`
- **Location**: `assets/hero-bg.jpg`
- **Recommended Aspect Ratio**: 16:9 (Landscape)
- **Recommended Dimension**: ~1920x1080px (Keep file sizes under 500KB using JPEG/WebP compression for fast loading)
- **Description**: Cinematic, atmospheric wider shot of a beautifully styled restaurant dining room, candlelit tables, or a moody bar ambiance.

### 2. Portfolio Items (Photos & Video Covers)
- **Portfolio Item 1 (Photography)**
  - **Filename**: `portfolio-1.jpg`
  - **Recommended Aspect Ratio**: 4:3 or 1:1 (Square)
  - **Recommended Dimension**: ~1200x900px
  - **Description**: Food close-up focusing on gourmet plating, fresh textures, and vibrant styling details.
  
- **Portfolio Item 2 (Videography / Action Reel)**
  - **Filename**: `portfolio-2.jpg` (Visual cover overlay)
  - **Recommended Aspect Ratio**: 4:3 or 1:1 (Square)
  - **Recommended Dimension**: ~1200x900px
  - **Description**: Action photo of culinary arts (e.g. chef tossing food with flames, steam, or slicing active ingredients).
  - **Video Source**: In `index.html` on the portfolio item (`class="portfolio-item video-item"`), update the `data-video` attribute:
    ```html
    data-video="assets/portfolio-2.mp4"
    ```
    Place your `.mp4` video reel inside `assets/portfolio-2.mp4` (~10-30 seconds, optimized/compressed).

- **Portfolio Item 3 (Photography)**
  - **Filename**: `portfolio-3.jpg`
  - **Recommended Aspect Ratio**: 4:3 or 1:1
  - **Recommended Dimension**: ~1200x900px
  - **Description**: Close-up drinks and mixology, showing pouring motion, liquid splashes, droplets, and premium glass detailing.

- **Portfolio Item 4 (Photography)**
  - **Filename**: `portfolio-4.jpg`
  - **Recommended Aspect Ratio**: 4:3 or 1:1
  - **Recommended Dimension**: ~1200x900px
  - **Description**: Casual restaurant specialty (e.g. rustic wood-fired pizza with bubbling cheese, artisan burgers, or craft styling).

- **Portfolio Item 5 (Videography / Detail Reel)**
  - **Filename**: `portfolio-5.jpg` (Visual cover overlay)
  - **Recommended Aspect Ratio**: 4:3 or 1:1
  - **Recommended Dimension**: ~1200x900px
  - **Description**: Pastry styling or desert detail preparation.
  - **Video Source**: In `index.html` on this portfolio item, update the `data-video` attribute:
    ```html
    data-video="assets/portfolio-5.mp4"
    ```
    Place your video file in `assets/portfolio-5.mp4`.

---

## Modifying Contact & Location Details

To update the address, social handles, phone numbers, and email, open `index.html` and modify the text in the following sections:

- **Email**: Find `<a href="mailto:hello@forgexmedia.com">hello@forgexmedia.com</a>` and replace with your business email.
- **Phone**: Find `<a href="tel:+14155558900">` and replace with your phone number.
- **Studio Location**: Replace `42 Culinary Boulevard...` under the `#contact` section with your actual physical office address.
- **Social Media Links**: Replace the dummy `#` links in the footer `<div class="footer-socials">` with your Instagram, TikTok, Vimeo, or YouTube URLs.

## Scroll Animations & Visuals (GSAP)
We use GreenSock (GSAP) and its `ScrollTrigger` plugin via a fast, reliable Cloudflare CDN to drive the scroll-based reveals, parallax effects, and smooth elements scaling. If you'd like to adjust animation speeds or intensities:
- Open `app.js` and locate `initScrollAnimations()`.
- Adjust values like `yPercent`, `duration`, `stagger`, or triggers.
