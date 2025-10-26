import { fetcher } from "./fetcher";

export async function searchItunes({
    term,
    country = "US",
    media = "music",
    entity = undefined,
    limit = 50,
    lang = "en_us",
    version = 2,
    explicit = "Yes",
    callback = undefined,
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

    return await fetcher.get(`/search?${params.toString()}`);
}

export async function lookupItunes({
    id,
    amgArtistId,
    amgAlbumId,
    amgVideoId,
    upc,
    isbn,
    entity,
    limit,
    sort,
}) {
    const params = new URLSearchParams();

    if (id) params.append("id", id);
    if (amgArtistId) params.append("amgArtistId", amgArtistId);
    if (amgAlbumId) params.append("amgAlbumId", amgAlbumId);
    if (amgVideoId) params.append("amgVideoId", amgVideoId);
    if (upc) params.append("upc", upc);
    if (isbn) params.append("isbn", isbn);
    if (entity) params.append("entity", entity);
    if (limit) params.append("limit", limit);
    if (sort) params.append("sort", sort);

    return await fetcher.get(`/lookup?${params.toString()}`);
}

