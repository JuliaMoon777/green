import React, { useEffect, useState } from 'react';

interface PixelatedMosaicPackshotProps {
  src: string;
  alt: string;
  className?: string;
}

const mosaicCache = new Map<string, string>();
const pendingPromises = new Map<string, Promise<string>>();

/**
 * Generates a high-craft pixelated mosaic + subtle frosted-glass censored image
 * while strictly preserving the original packaging's alpha silhouette.
 */
function generatePixelatedMosaic(src: string): Promise<string> {
  const cached = mosaicCache.get(src);
  if (cached) {
    return Promise.resolve(cached);
  }

  const pending = pendingPromises.get(src);
  if (pending) {
    return pending;
  }

  const promise = new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';

    img.onload = () => {
      try {
        const width = img.naturalWidth || 900;
        const height = img.naturalHeight || 900;

        // Medium-sized mosaic pixel grid (~22 columns across canvas -> ~14 blocks across the pouch)
        // Ensures all logos, product names, and graphics are completely unreadable
        // while keeping individual square mosaic pixels clearly visible.
        const gridCols = 22;
        const gridRows = Math.max(1, Math.round(gridCols * (height / width)));
        const subSample = 4;
        const sampleW = gridCols * subSample;
        const sampleH = gridRows * subSample;

        // 1. Sample source image at 4x mosaic resolution to compute clean alpha-weighted block averages
        const sampleCanvas = document.createElement('canvas');
        sampleCanvas.width = sampleW;
        sampleCanvas.height = sampleH;
        const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

        if (!sampleCtx) {
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        sampleCtx.imageSmoothingEnabled = true;
        sampleCtx.imageSmoothingQuality = 'medium';
        sampleCtx.drawImage(img, 0, 0, sampleW, sampleH);
        const sampleData = sampleCtx.getImageData(0, 0, sampleW, sampleH).data;

        interface CellColor {
          r: number;
          g: number;
          b: number;
          valid: boolean;
        }

        const cells: CellColor[] = new Array(gridCols * gridRows);

        for (let gy = 0; gy < gridRows; gy++) {
          for (let gx = 0; gx < gridCols; gx++) {
            let rSum = 0;
            let gSum = 0;
            let bSum = 0;
            let wSum = 0;

            for (let sy = 0; sy < subSample; sy++) {
              const py = gy * subSample + sy;
              for (let sx = 0; sx < subSample; sx++) {
                const px = gx * subSample + sx;
                const idx = (py * sampleW + px) * 4;
                const a = sampleData[idx + 3];
                if (a > 20) {
                  const weight = a / 255;
                  rSum += sampleData[idx] * weight;
                  gSum += sampleData[idx + 1] * weight;
                  bSum += sampleData[idx + 2] * weight;
                  wSum += weight;
                }
              }
            }

            const cellIdx = gy * gridCols + gx;
            if (wSum > 0.05) {
              // Blend sampled color with a subtle warm frosted-glass veil (#FBF5EA)
              // so the pixelation feels refined, cohesive, and premium
              const rawR = rSum / wSum;
              const rawG = gSum / wSum;
              const rawB = bSum / wSum;

              const frostMix = 0.16;
              const frostR = 251;
              const frostG = 245;
              const frostB = 234;

              cells[cellIdx] = {
                r: Math.round(rawR * (1 - frostMix) + frostR * frostMix),
                g: Math.round(rawG * (1 - frostMix) + frostG * frostMix),
                b: Math.round(rawB * (1 - frostMix) + frostB * frostMix),
                valid: true,
              };
            } else {
              cells[cellIdx] = { r: 228, g: 205, b: 172, valid: false };
            }
          }
        }

        // Dilate valid mosaic cell colors outward by 2 passes so edge cells masked by the silhouette
        // never show transparent/dark boundary artifacts
        for (let pass = 0; pass < 2; pass++) {
          const snapshot = cells.map((c) => ({ ...c }));
          for (let gy = 0; gy < gridRows; gy++) {
            for (let gx = 0; gx < gridCols; gx++) {
              const idx = gy * gridCols + gx;
              if (snapshot[idx].valid) continue;

              let rAcc = 0;
              let gAcc = 0;
              let bAcc = 0;
              let count = 0;

              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const nx = gx + dx;
                  const ny = gy + dy;
                  if (nx >= 0 && nx < gridCols && ny >= 0 && ny < gridRows) {
                    const nCell = snapshot[ny * gridCols + nx];
                    if (nCell.valid) {
                      rAcc += nCell.r;
                      gAcc += nCell.g;
                      bAcc += nCell.b;
                      count++;
                    }
                  }
                }
              }

              if (count > 0) {
                cells[idx] = {
                  r: Math.round(rAcc / count),
                  g: Math.round(gAcc / count),
                  b: Math.round(bAcc / count),
                  valid: true,
                };
              }
            }
          }
        }

        // 2. Render crisp medium-sized mosaic blocks onto the full-resolution canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = width;
        outCanvas.height = height;
        const ctx = outCanvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Output Canvas 2D context unavailable'));
          return;
        }

        ctx.imageSmoothingEnabled = false;

        for (let gy = 0; gy < gridRows; gy++) {
          const y0 = Math.floor((gy * height) / gridRows);
          const y1 = Math.ceil(((gy + 1) * height) / gridRows);
          const cellH = Math.max(1, y1 - y0);

          for (let gx = 0; gx < gridCols; gx++) {
            const x0 = Math.floor((gx * width) / gridCols);
            const x1 = Math.ceil(((gx + 1) * width) / gridCols);
            const cellW = Math.max(1, x1 - x0);

            const { r, g, b } = cells[gy * gridCols + gx];

            // Base mosaic pixel block
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x0, y0, cellW, cellH);

            // Subtle frosted-glass mosaic tile highlight (top & left edge)
            const edgeSize = Math.max(1, Math.round(Math.min(cellW, cellH) * 0.045));
            ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
            ctx.fillRect(x0, y0, cellW, edgeSize);
            ctx.fillRect(x0, y0, edgeSize, cellH);

            // Subtle dimensional tile bevel (bottom & right edge)
            ctx.fillStyle = 'rgba(62, 40, 24, 0.07)';
            ctx.fillRect(x0, y0 + cellH - edgeSize, cellW, edgeSize);
            ctx.fillRect(x0 + cellW - edgeSize, y0, edgeSize, cellH);
          }
        }

        // 3. Add a soft translucent frosted-glass sheen across the mosaic surface
        const sheen = ctx.createLinearGradient(0, 0, width, height);
        sheen.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
        sheen.addColorStop(0.45, 'rgba(255, 252, 245, 0.05)');
        sheen.addColorStop(1, 'rgba(245, 234, 216, 0.14)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, width, height);

        // 4. Mask strictly to the original packaging's alpha silhouette
        ctx.globalCompositeOperation = 'destination-in';
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = outCanvas.toDataURL('image/webp', 0.94);
        mosaicCache.set(src, dataUrl);
        pendingPromises.delete(src);
        resolve(dataUrl);
      } catch (err) {
        pendingPromises.delete(src);
        reject(err);
      }
    };

    img.onerror = (err) => {
      pendingPromises.delete(src);
      reject(err);
    };

    img.src = src;
  });

  pendingPromises.set(src, promise);
  return promise;
}

// Pre-warm the Creamy Butter + Graham mosaic on module load in browser environments
const CREAMY_BUTTER_GRAHAM_IMAGE =
  '/products/protein-cookies/protein-cookies-creamy-butter-graham.webp';
if (typeof window !== 'undefined') {
  generatePixelatedMosaic(CREAMY_BUTTER_GRAHAM_IMAGE).catch(() => {
    // Ignored; will retry on component mount if needed
  });
}

export const PixelatedMosaicPackshot: React.FC<PixelatedMosaicPackshotProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [mosaicUrl, setMosaicUrl] = useState<string | null>(() => mosaicCache.get(src) || null);

  useEffect(() => {
    let active = true;
    const cached = mosaicCache.get(src);
    if (cached) {
      setMosaicUrl(cached);
      return;
    }

    generatePixelatedMosaic(src)
      .then((url) => {
        if (active) setMosaicUrl(url);
      })
      .catch(() => {
        // Fallback handled via SVG mosaic filter if canvas fails
      });

    return () => {
      active = false;
    };
  }, [src]);

  if (mosaicUrl) {
    return (
      <img
        src={mosaicUrl}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={className}
      />
    );
  }

  // Instant SVG pixelated mosaic fallback while canvas finishes (prevents ever flashing the raw packaging)
  return (
    <>
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="greenergy-instant-mosaic-fallback" x="0%" y="0%" width="100%" height="100%">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="20" height="20" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="10" result="mosaic" />
            <feComposite in="mosaic" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{ filter: 'url(#greenergy-instant-mosaic-fallback)' }}
        className={className}
      />
    </>
  );
};
