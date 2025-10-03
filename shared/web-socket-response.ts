import {ApplicationDTO} from "./DTO";
import {ConsoleMessage} from "./console-message";

export type WebSocketResponseTypes = "application" | "consoleMessage"
export type WebSocketResponseData = ApplicationDTO | ConsoleMessage;

export interface WebSocketResponse {
    type: WebSocketResponseTypes;
    data: WebSocketResponseData;
}