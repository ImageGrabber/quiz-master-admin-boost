/**
 * Utility functions for Video SEO and structured data.
 */

/**
 * Extracts the YouTube video ID from various URL formats.
 */
export const getYouTubeId = (url: string): string => {
    if (!url) return "";
    try {
        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1]?.split("?")[0] || "";
        }
        if (url.includes("/embed/")) {
            return url.split("/embed/")[1]?.split("?")[0] || "";
        }
        if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1]?.split("&")[0] || "";
        }
        // Handle short URLs like youtube.com/v/ID or youtube.com/vi/ID
        const match = url.match(/(?:v=|vi\/|v\/|youtu\.be\/|embed\/)([^#&?]*).*/);
        return (match && match[1]) || "";
    } catch {
        return "";
    }
};

interface VideoSchemaParams {
    title: string;
    description: string;
    thumbnailUrl?: string;
    videoUrl: string;
    uploadDate?: string;
}

/**
 * Generates a standard VideoObject JSON-LD schema.
 */
export const generateVideoSchema = ({
    title,
    description,
    thumbnailUrl,
    videoUrl,
    uploadDate = "2024-01-01T08:00:00+08:00"
}: VideoSchemaParams) => {
    const videoId = getYouTubeId(videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    const contentUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl;
    const finalThumbnail = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "https://biblequizcompetition.com/sword.png");

    return {
        "@type": "VideoObject",
        "name": title,
        "description": description,
        "thumbnailUrl": [finalThumbnail],
        "uploadDate": uploadDate,
        "embedUrl": embedUrl,
        "contentUrl": contentUrl,
        "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "WatchAction" },
            "userInteractionCount": 1234
        }
    };
};
