export const API_URL = {
    getProfile: (email: string) => `http://localhost:8080/get-user?email=${email}&tableName=coordinator`,
}