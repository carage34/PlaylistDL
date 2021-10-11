export interface music {
    snippet: {
        resourceId: {
            videoId: string
        },
        title: string
    }
}

export interface infos {
    videoId: string;
    title: string;
    duration: number;
    fileSize: number;
}
