import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {INTRO_BACKDROP_WEBP_BASE64} from './src/assets/introBackdropAsset';

const INTRO_BACKDROP_TARGETS = [
  'greenergy-intro-bg.webp',
  'greenergy-intro-bg.jpg',
  'bg-clean-campaign-backdrop.webp',
  'bg-clean-campaign-backdrop.jpg',
];

const BACKGROUND_ASSET_MAP: Array<{src: string; dest: string}> = [
  {
    src: 'src/assets/images/greenergy_clean_campaign_backdrop_1791375708673.jpg',
    dest: 'public/backgrounds/greenergy-intro-bg.jpg',
  },
  {
    src: 'src/assets/images/greenergy_clean_campaign_backdrop_1791375708673.jpg',
    dest: 'public/backgrounds/bg-clean-campaign-backdrop.jpg',
  },
  {
    src: 'src/assets/images/greenergy_editorial_tabletop_studio_1791375254098.jpg',
    dest: 'public/backgrounds/bg-editorial-tabletop-studio.jpg',
  },
  {
    src: 'src/assets/images/bg_chili_lemon_1790322043882.jpg',
    dest: 'public/backgrounds/bg-chili-lemon.jpg',
  },
  {
    src: 'src/assets/images/bg_tomato_basil_1790322054693.jpg',
    dest: 'public/backgrounds/bg-tomato-basil.jpg',
  },
  {
    src: 'src/assets/images/bg_herbs_olives_1790322066466.jpg',
    dest: 'public/backgrounds/bg-sweet-herbs-olives.jpg',
  },
  {
    src: 'src/assets/images/bg_honey_mustard_1790322076385.jpg',
    dest: 'public/backgrounds/bg-honey-mustard.jpg',
  },
  {
    src: 'src/assets/images/bg_lemon_pepper_1790322086562.jpg',
    dest: 'public/backgrounds/bg-chickpea-lemon-pepper.jpg',
  },
  {
    src: 'src/assets/images/bg_salted_chickpea_1790322095100.jpg',
    dest: 'public/backgrounds/bg-chickpea-salted.jpg',
  },
  {
    src: 'src/assets/images/bg_apple_cinnamon_1790322117442.jpg',
    dest: 'public/backgrounds/bg-cookie-apple-cinnamon.jpg',
  },
  {
    src: 'src/assets/images/bg_chocolate_cookie_1790322105239.jpg',
    dest: 'public/backgrounds/bg-cookie-double-chocolate.jpg',
  },
  {
    src: 'src/assets/images/bg_butter_graham_1790322128139.jpg',
    dest: 'public/backgrounds/bg-cookie-creamy-butter-graham.jpg',
  },
  {
    src: 'src/assets/images/bg_display_box_1790322139580.jpg',
    dest: 'public/backgrounds/bg-cookie-display-box.jpg',
  },
  {
    src: 'src/assets/images/bg_red_thai_1790322149674.jpg',
    dest: 'public/backgrounds/bg-peanuts-fava-red-thai.jpg',
  },
  {
    src: 'src/assets/images/bg_sweet_mustard_1790322160169.jpg',
    dest: 'public/backgrounds/bg-peanuts-fava-sweet-mustard.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_chili_lemon_1791370790421.jpg',
    dest: 'public/backgrounds/bg-mobile-chili-lemon.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_tomato_basil_1791370801214.jpg',
    dest: 'public/backgrounds/bg-mobile-tomato-basil.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_herbs_olives_1791370813938.jpg',
    dest: 'public/backgrounds/bg-mobile-sweet-herbs-olives.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_honey_mustard_1791370829655.jpg',
    dest: 'public/backgrounds/bg-mobile-honey-mustard.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_lemon_pepper_1791370841820.jpg',
    dest: 'public/backgrounds/bg-mobile-chickpea-lemon-pepper.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_chickpea_salted_1791370851685.jpg',
    dest: 'public/backgrounds/bg-mobile-chickpea-salted.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_apple_cinnamon_1791370881947.jpg',
    dest: 'public/backgrounds/bg-mobile-cookie-apple-cinnamon.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_double_chocolate_1791370866975.jpg',
    dest: 'public/backgrounds/bg-mobile-cookie-double-chocolate.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_butter_graham_1791370892915.jpg',
    dest: 'public/backgrounds/bg-mobile-cookie-creamy-butter-graham.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_red_thai_1791370906899.jpg',
    dest: 'public/backgrounds/bg-mobile-peanuts-fava-red-thai.jpg',
  },
  {
    src: 'src/assets/images/bg_mobile_sweet_mustard_1791370928490.jpg',
    dest: 'public/backgrounds/bg-mobile-peanuts-fava-sweet-mustard.jpg',
  },
];

function ensurePublicBackgrounds(): Plugin {
  const writeIntroBackdropFiles = (targetDir: string) => {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, {recursive: true});
    }
    const introBuffer = Buffer.from(INTRO_BACKDROP_WEBP_BASE64, 'base64');
    for (const filename of INTRO_BACKDROP_TARGETS) {
      const filePath = path.join(targetDir, filename);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
        fs.writeFileSync(filePath, introBuffer);
      }
    }
  };

  return {
    name: 'ensure-public-backgrounds',
    configResolved() {
      const bgDir = path.resolve(__dirname, 'public/backgrounds');
      writeIntroBackdropFiles(bgDir);

      for (const {src, dest} of BACKGROUND_ASSET_MAP) {
        const srcPath = path.resolve(__dirname, src);
        const destJpgPath = path.resolve(__dirname, dest);
        const destWebpPath = path.resolve(
          __dirname,
          dest.replace(/\.jpg$/, '.webp')
        );
        if (fs.existsSync(srcPath)) {
          if (!fs.existsSync(destJpgPath)) {
            fs.copyFileSync(srcPath, destJpgPath);
          }
          if (!fs.existsSync(destWebpPath)) {
            fs.copyFileSync(srcPath, destWebpPath);
          }
        }
      }
    },
    closeBundle() {
      const distBgDir = path.resolve(__dirname, 'dist/backgrounds');
      writeIntroBackdropFiles(distBgDir);
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    publicDir: 'public',
    plugins: [ensurePublicBackgrounds(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
