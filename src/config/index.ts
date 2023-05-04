import { config } from "dotenv"
config()

export const {
    LOG_DIR,
    LOG_FORMAT,
    PORT,
    NODE_ENV
} = process.env