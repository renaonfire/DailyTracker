export interface Project {
    projectName?: string;
    createdDate?: string;
}

export interface Activities {
        id: number;
        daysDate: string;
        startTime?: string;
        type?: string;
        category?: string;
        images: string[];
}
