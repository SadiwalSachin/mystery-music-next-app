import { z } from "zod";

export const signInSchemaValidation = z.object({
    identifier:z.string(),// identifier hi email , username hai
    password:z.string()
})