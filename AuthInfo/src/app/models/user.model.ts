export interface User {
    _id: string; // MongoDBの_idは通常string型
    user_id: number;
    user_name: string;
    role: string;
    category_id: number;
    extension_number: number;
    mail_address: string; 
    model_id: number;
    organization: string;
}