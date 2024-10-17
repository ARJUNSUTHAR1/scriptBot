
import {PrismaClient} from "@prisma/client" 
const db = new PrismaClient();
export default db // Export the Prisma client for other files to use. This client is already configured with your database connection details.
