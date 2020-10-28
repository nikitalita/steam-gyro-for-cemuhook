import * as path from "path";
import { AppManager } from "./lib/app-manager";

let userDataDir: string;
let manager: AppManager | undefined = undefined;

if (process.platform === "win32"){
    userDataDir = process.env.PORTABLE_EXECUTABLE_DIR || "";
} else { // linux, macos, etc.
    if (process.env.HOME){
        userDataDir = path.join(process.env.HOME, ".config/steam-gyro-for-cemuhook");
    } else {
        userDataDir = "";
    }
}

if (userDataDir !== undefined) {
    (async () => {
        try {
            manager = await AppManager.create(userDataDir, "steam-gyro.json");
            if (!manager){
                throw new Error("Manager did not start.")
            } else {
                process.on('message',(m)=>{
                    if (m === 'reset' && manager){
                        manager.exit()
                    }       
                })
            }            
        } catch (error) {
            throw error;
        }
    })();
} else {
    throw new Error("User directory is not set.");
}
