import {ApplicationDTO} from "./DTO";
import {ConsoleMessage} from "./console-message";

export interface WebSocketResponse {
    type: string;
    data: ApplicationDTO | ConsoleMessage;
}