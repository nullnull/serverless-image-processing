import sharp from "sharp";
import request from "request-promise";
const SAMPLE_IMAGE_URL =
  "https://katsumanarisawa.me/_nuxt/img/sunset.768f32b.jpg";

const SAMPLE_CREDIT_URL =
  "https://katsumanarisawa.me/_nuxt/img/symbol_2_wh.2d8cacc.png";

export const convertImage = async (req: any, res: any) => {
  const sampleImage = await request.get(SAMPLE_IMAGE_URL, { encoding: null });
  const sampleCredit = await request.get(SAMPLE_CREDIT_URL, { encoding: null });
  const image = sharp(Buffer.from(sampleImage))
    .resize(840, 360)
    .composite([
      {
        input: Buffer.from(sampleCredit),
      },
    ]);

  res.type("jpg");
  res.send(await image.toBuffer());
};
