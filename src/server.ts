import { serverHttp } from "./http";
import "./websocket";
import "./database";


serverHttp.listen(4001, () => console.log("Server is running on PORT 4001"));