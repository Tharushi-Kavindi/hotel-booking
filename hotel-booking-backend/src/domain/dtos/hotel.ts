import { privateDecrypt } from "crypto";
import { z } from "zod";

export const CreateHotelDto = z.object({
  name: z.string(),
  image: z.string(),
  location: z.string(),
  price: z.number(),
  description: z.string(),
});
