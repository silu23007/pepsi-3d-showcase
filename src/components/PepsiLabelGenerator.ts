/**
 * Generates beautiful, authentic high-resolution Pepsi can label textures dynamically.
 */
import { PepsiFlavor } from '../types';

export function createPepsiLabel(flavor: PepsiFlavor): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return canvas;

  // Clear canvas
  ctx.clearRect(0, 0, 1024, 1024);

  // 1. Draw Background
  if (flavor.id === 'classic') {
    // Royal Blue Gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#005CA9');
    grad.addColorStop(0.5, '#004B87');
    grad.addColorStop(1, '#002B5C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Decorative dynamic diagonal waves
    ctx.fillStyle = 'rgba(201, 0, 43, 0.25)'; // Pepsi Red soft wave
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.bezierCurveTo(400, 300, 100, 700, 400, 1024);
    ctx.lineTo(0, 1024);
    ctx.lineTo(0, 0);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'; // Light blue/white soft light
    ctx.beginPath();
    ctx.moveTo(500, 0);
    ctx.bezierCurveTo(700, 400, 400, 800, 800, 1024);
    ctx.lineTo(1024, 1024);
    ctx.lineTo(1024, 0);
    ctx.fill();

    // Pepsi Wave Pattern in center
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(-100, 500);
    ctx.bezierCurveTo(300, 300, 700, 700, 1124, 500);
    ctx.stroke();

  } else if (flavor.id === 'zero') {
    // Matte Black Background
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#1c1c1c');
    grad.addColorStop(0.4, '#0f0f0f');
    grad.addColorStop(0.8, '#050505');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle carbon/brushed diagonal lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 3;
    for (let i = -1024; i < 1024; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 1024, 1024);
      ctx.stroke();
    }

    // High contrast neon/red stripe details (Zero Sugar style)
    const redGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    redGrad.addColorStop(0, 'rgba(201, 0, 43, 0.08)');
    redGrad.addColorStop(0.5, 'rgba(201, 0, 43, 0.2)');
    redGrad.addColorStop(1, 'rgba(201, 0, 43, 0.05)');
    ctx.fillStyle = redGrad;
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.bezierCurveTo(550, 400, 350, 800, 600, 1024);
    ctx.lineTo(450, 1024);
    ctx.bezierCurveTo(250, 800, 450, 400, 300, 0);
    ctx.fill();

    // Small glowing blue highlight
    ctx.fillStyle = 'rgba(0, 75, 135, 0.15)';
    ctx.beginPath();
    ctx.arc(512, 420, 300, 0, Math.PI * 2);
    ctx.fill();

  } else if (flavor.id === 'diet') {
    // Silver / Light Gray gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#EDEDED');
    grad.addColorStop(0.3, '#D9E2EC');
    grad.addColorStop(0.7, '#BCCCDC');
    grad.addColorStop(1, '#9FB3C8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Dynamic diagonal silver stripes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(1024, 600);
    ctx.lineTo(1024, 700);
    ctx.lineTo(0, 300);
    ctx.fill();

    ctx.fillStyle = 'rgba(0, 75, 135, 0.1)'; // Silver/Blue overlay
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.bezierCurveTo(450, 300, 250, 700, 500, 1024);
    ctx.lineTo(1024, 1024);
    ctx.lineTo(1024, 0);
    ctx.fill();
  }

  // 2. DRAW THE PEPSI GLOBE LOGO (Centered on the front at x = 512, y = 400)
  const logoX = 512;
  const logoY = 410;
  const logoR = 150;

  // We draw inside a clipped path to ensure perfect circular boundaries
  ctx.save();
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR, 0, Math.PI * 2);
  ctx.clip();

  // Draw upper portion (Pepsi Red)
  ctx.fillStyle = '#C9002B';
  ctx.fillRect(logoX - logoR - 10, logoY - logoR - 10, logoR * 2 + 20, logoR * 2 + 20);

  // Draw lower portion (Pepsi Blue)
  ctx.fillStyle = '#004B87';
  if (flavor.id === 'zero') {
    ctx.fillStyle = '#0A0A0A'; // Black in Zero Sugar Pepsi logo
  }
  ctx.beginPath();
  ctx.moveTo(logoX - logoR - 10, logoY);
  ctx.lineTo(logoX + logoR + 10, logoY);
  ctx.lineTo(logoX + logoR + 10, logoY + logoR + 10);
  ctx.lineTo(logoX - logoR - 10, logoY + logoR + 10);
  ctx.closePath();
  ctx.fill();

  // Draw white sweeping ribbon (The Pepsi Wave)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  // We make a custom cubic bezier wave
  // Wave starts thinner on the left, dips below center, and sweeps thick on the right
  ctx.moveTo(logoX - logoR - 10, logoY - 20);
  ctx.bezierCurveTo(
    logoX - logoR / 2, logoY - 50,
    logoX - logoR / 3, logoY + 50,
    logoX + logoR + 10, logoY - 80
  );
  ctx.lineTo(logoX + logoR + 10, logoY + 30);
  ctx.bezierCurveTo(
    logoX + logoR / 2, logoY + 80,
    logoX - logoR / 3, logoY + 110,
    logoX - logoR - 10, logoY + 40
  );
  ctx.closePath();
  ctx.fill();

  // End of clipped globe
  ctx.restore();

  // Add a nice glossy circular highlight ring on the globe
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR - 2, 0, Math.PI * 2);
  ctx.stroke();

  // Glossy overlay (Linear gradient highlight)
  const gloss = ctx.createLinearGradient(0, logoY - logoR, 0, logoY + logoR);
  gloss.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  gloss.addColorStop(0.3, 'rgba(255, 255, 255, 0.0)');
  gloss.addColorStop(0.8, 'rgba(0, 0, 0, 0.0)');
  gloss.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.fillStyle = gloss;
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR, 0, Math.PI * 2);
  ctx.fill();


  // 3. DRAW THE TEXT/TYPOGRAPHY

  // Main "pepsi" name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw branding labels based on flavor
  if (flavor.id === 'classic') {
    // "pepsi" in bold, custom modern style
    ctx.font = 'bold 110px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('pepsi', logoX, logoY + logoR + 90);

    // "ORIGINAL COLA"
    ctx.font = '900 24px "Inter", "Helvetica Neue", sans-serif';
    ctx.fillStyle = '#C9002B'; // Pepsi Red
    ctx.letterSpacing = '8px';
    ctx.fillText('ORIGINAL COLA', logoX, logoY + logoR + 160);
    ctx.letterSpacing = '0px'; // reset

  } else if (flavor.id === 'zero') {
    // "pepsi" name
    ctx.font = 'bold 110px "Inter", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('pepsi', logoX, logoY + logoR + 90);

    // "ZERO SUGAR"
    ctx.font = '900 26px "Inter", sans-serif';
    ctx.fillStyle = '#C9002B'; // Bright Red
    ctx.letterSpacing = '6px';
    ctx.fillText('ZERO SUGAR', logoX, logoY + logoR + 160);
    ctx.letterSpacing = '0px';

  } else if (flavor.id === 'diet') {
    // "pepsi" name in Blue
    ctx.font = 'bold 110px "Inter", sans-serif';
    ctx.fillStyle = '#004B87';
    ctx.fillText('pepsi', logoX, logoY + logoR + 90);

    // "DIET" above the logo
    ctx.font = '900 28px "Inter", sans-serif';
    ctx.fillStyle = '#C9002B';
    ctx.letterSpacing = '10px';
    ctx.fillText('DIET', logoX, logoY - logoR - 45);
    ctx.letterSpacing = '0px';

    // "LIGHT COLA" below
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillStyle = '#004B87';
    ctx.letterSpacing = '5px';
    ctx.fillText('LIGHT REFRESHMENT', logoX, logoY + logoR + 160);
    ctx.letterSpacing = '0px';
  }


  // 4. RECREATING THE BACK OF THE CAN (Authenticity & Realism)
  // Back panel is centered around x = 160 and x = 864 (left and right edges wrap to form the back)
  // Let's draw details on the LEFT SIDE of the flat texture (x = 100 to 260)
  const backX = 170;

  // A. Nutrition Facts Title
  ctx.textAlign = 'left';
  ctx.fillStyle = flavor.id === 'diet' ? '#1e293b' : 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillText('Nutrition Facts', backX, 260);

  // Nutrition Facts lines
  ctx.strokeStyle = flavor.id === 'diet' ? '#64748b' : 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(backX, 275);
  ctx.lineTo(backX + 160, 275);
  ctx.stroke();

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Serving size: 1 Can', backX, 290);

  ctx.beginPath();
  ctx.moveTo(backX, 300);
  ctx.lineTo(backX + 160, 300);
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('Amount per serving', backX, 315);
  
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.fillText('Calories', backX, 335);
  ctx.textAlign = 'right';
  ctx.fillText(flavor.nutrition.calories, backX + 160, 335);

  ctx.beginPath();
  ctx.moveTo(backX, 345);
  ctx.lineTo(backX + 160, 345);
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Total Fat  0g', backX, 360);
  ctx.textAlign = 'right';
  ctx.fillText('0%', backX + 160, 360);

  ctx.textAlign = 'left';
  ctx.fillText('Sodium  ' + flavor.nutrition.sodium, backX, 380);
  ctx.textAlign = 'right';
  ctx.fillText('2%', backX + 160, 380);

  ctx.textAlign = 'left';
  ctx.fillText('Total Carb.  ' + (flavor.id === 'classic' ? '41g' : '0g'), backX, 400);
  ctx.textAlign = 'right';
  ctx.fillText(flavor.id === 'classic' ? '15%' : '0%', backX + 160, 400);

  ctx.textAlign = 'left';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.fillText('   Total Sugars  ' + flavor.nutrition.sugar, backX, 420);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Protein  0g', backX, 440);

  ctx.beginPath();
  ctx.moveTo(backX, 455);
  ctx.lineTo(backX + 160, 455);
  ctx.lineWidth = 1;
  ctx.stroke();

  // Caffeine info
  ctx.textAlign = 'left';
  ctx.font = 'italic 10px "Inter", sans-serif';
  ctx.fillText(`Caffeine: ${flavor.nutrition.caffeine}`, backX, 470);


  // B. Ingredients and Manufacturer info
  const ingX = backX;
  ctx.font = '900 11px "Inter", sans-serif';
  ctx.fillText('INGREDIENTS:', ingX, 510);
  
  ctx.font = '9px "Inter", sans-serif';
  const ingredients = flavor.id === 'classic' 
    ? 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CARAMEL COLOR, SUGAR, PHOSPHORIC ACID, CAFFEINE, CITRIC ACID, NATURAL FLAVOR.'
    : flavor.id === 'zero'
    ? 'CARBONATED WATER, CARAMEL COLOR, PHOSPHORIC ACID, ASPARTAME, POTASSIUM BENZOATE, CAFFEINE, NATURAL FLAVOR, ACESULFAME POTASSIUM, CITRIC ACID, PANAX GINSENG ROOT EXTRACT.'
    : 'CARBONATED WATER, CARAMEL COLOR, ASPARTAME, PHOSPHORIC ACID, POTASSIUM BENZOATE, CAFFEINE, CITRIC ACID, NATURAL FLAVOR.';

  // Draw word wrapped ingredients
  wrapText(ctx, ingredients, ingX, 525, 160, 12);

  // C. Barcode on the RIGHT SIDE of the back (around x = 850)
  const barX = 810;
  const barY = 550;
  const barW = 140;
  const barH = 75;

  // Background white box for barcode to make it pop and feel real
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(barX - 10, barY - 10, barW + 20, barH + 30);

  // Draw barcode lines
  ctx.fillStyle = '#000000';
  ctx.fillRect(barX, barY, 4, barH);
  ctx.fillRect(barX + 8, barY, 2, barH);
  ctx.fillRect(barX + 12, barY, 6, barH);
  ctx.fillRect(barX + 22, barY, 3, barH);
  ctx.fillRect(barX + 28, barY, 1, barH);
  ctx.fillRect(barX + 34, barY, 4, barH);
  ctx.fillRect(barX + 44, barY, 2, barH);
  ctx.fillRect(barX + 48, barY, 5, barH);
  ctx.fillRect(barX + 58, barY, 3, barH);
  ctx.fillRect(barX + 66, barY, 1, barH);
  ctx.fillRect(barX + 72, barY, 6, barH);
  ctx.fillRect(barX + 82, barY, 2, barH);
  ctx.fillRect(barX + 88, barY, 4, barH);
  ctx.fillRect(barX + 96, barY, 5, barH);
  ctx.fillRect(barX + 104, barY, 1, barH);
  ctx.fillRect(barX + 112, barY, 3, barH);
  ctx.fillRect(barX + 120, barY, 6, barH);
  ctx.fillRect(barX + 130, barY, 2, barH);
  ctx.fillRect(barX + 136, barY, 4, barH);

  ctx.textAlign = 'center';
  ctx.font = '10px "Courier New", monospace';
  ctx.fillText('0  12000 00155  8', barX + barW / 2, barY + barH + 12);


  // D. Recycle and Volume Labels
  ctx.textAlign = 'left';
  ctx.fillStyle = flavor.id === 'diet' ? '#1e293b' : 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('12 FL OZ (355 mL)', ingX, 640);
  
  ctx.font = '8px "Inter", sans-serif';
  ctx.fillText('PLEASE RECYCLE', ingX, 660);

  // Draw simple recycling chasing arrows symbol
  ctx.strokeStyle = flavor.id === 'diet' ? '#475569' : 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Arrow 1
  ctx.moveTo(ingX + 110, 655);
  ctx.lineTo(ingX + 125, 655);
  ctx.lineTo(ingX + 118, 667);
  ctx.closePath();
  ctx.stroke();

  return canvas;
}

// Helper function to wrap text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
