import { Contact } from "./contact.model";

export interface DetailedContact extends Contact {
    address: string;
    cell: string;
    registrationDate: string;
    age: number;
}