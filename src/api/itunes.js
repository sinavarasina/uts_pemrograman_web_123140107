import { fetcher } from "./fetcher";

export async function searchItunes({
    term,
    country = "US",
    media = "music",
    entity,
    limit = 50,
    lang = "en_us",
    version = 2,
    explicit = "Yes",
    callback,
}) {
    if (!term) throw new Error("Parameter 'term' wajib diisi.");

    const params = new URLSearchParams({
        term,
        country,
        media,
        limit,
        lang,
        version,
        explicit,
    });

    if (entity) params.append("entity", entity);
    if (callback) params.append("callback", callback);

    const data = await fetcher.get(`/search?${params.toString()}`);

    return data.results;
}

