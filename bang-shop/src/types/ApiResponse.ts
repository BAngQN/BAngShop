export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

type SuccessResponse<T> = {
    type: "success";
    data: T;
};

type ErrorResponse = {
    type: "error";
    statusCode: number;
    message: string;
};

export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
}
