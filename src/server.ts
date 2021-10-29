import { serverHttp } from "./http";
import "./database";
import "./websocket";

serverHttp.listen(4001, () => console.log("Server is running on PORT 4001"));