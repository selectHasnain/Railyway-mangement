
export interface Query {
    page?: number;
    take?: number;
    id?: number;
    keyword?: string;
}

export interface Login {
    email: string;
    password: string;
}