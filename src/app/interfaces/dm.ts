import { Timestamp } from "@angular/fire/firestore/lite";

export interface DM {
    threadId: string;
    message: string;
    sender: string;
    timestamp: Timestamp;
    reactions: any[];
}