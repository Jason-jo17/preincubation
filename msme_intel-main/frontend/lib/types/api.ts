export interface ApiErrorResponse {
    error: string;
    message: string;
    statusCode: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
