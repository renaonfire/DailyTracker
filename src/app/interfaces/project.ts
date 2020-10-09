export interface Project {
    projectName?: string;
    createdDate?: string;
}

export interface Activities {
        id: number,
        daysDate: string;
        startTime?: string;
        category?: string;
        images: string[];
}
