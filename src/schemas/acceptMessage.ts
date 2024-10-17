import { z } from "zod";

export const acceptMessageSchemaVaildation = z.object({
    acceptMessages:z.boolean(),
})
    