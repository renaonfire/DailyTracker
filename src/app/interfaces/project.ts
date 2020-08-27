export interface Project {
    id?: string;
    projectName?: string;
    data?: {
        date?: string;
        day?: {
            activities?: {
                    startTime?: string,
                    category?: string
                }
        }
    }
}
