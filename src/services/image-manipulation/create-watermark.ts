import Jimp from "jimp";
import User from "../database/models/User";

export async function createWatermark(buffer: Buffer, photographerId: string) {
    const user = await User.findOne({ userId: photographerId }); // Use the correct syntax for finding a user
  
    const companyName = user.companyName; // Get the companyName from the user object
    const imageBuffer = await Jimp.read(buffer);
    const waterMarkText = "Proofing version || " + companyName;
    const font = await Jimp.loadFont("src/core/watermarkFonts/BULLETTO_48_WHITE.fnt");
    const textWidth = Jimp.measureText(font, waterMarkText);
    const textHeight = Jimp.measureTextHeight(font, waterMarkText, 1000);
    const x = imageBuffer.getWidth() / 2 - textWidth / 2;
    const y = imageBuffer.getHeight() / 2 - textHeight / 2;
  
    imageBuffer.print(font, x, y, waterMarkText);
    const watermarkedBuffer = await imageBuffer.getBufferAsync(
      imageBuffer.getMIME()
    );
  
    return watermarkedBuffer;
  }
  