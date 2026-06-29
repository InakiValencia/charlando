# Blog con Sanity

## Variables de entorno

Configurar en local y en Vercel:

```bash
VITE_SANITY_PROJECT_ID=irdg3uqh
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-06-26
VITE_SITE_URL=https://www.charlando.com.ar
```

No usar tokens privados en el frontend. Esta integracion lee contenido publicado del dataset publico.

## Sanity Studio

El Studio del blog quedo instalado en este repo y desplegado en Sanity Hosting:

```text
https://charlando-cms.sanity.studio/
```

Tambien se puede correr local:

```bash
cd sanity-studio
npm run dev
```

El proyecto configurado es:

```text
Project ID: irdg3uqh
Dataset: production
API version web: 2026-06-26
```

Orígenes CORS configurados en Sanity:

- `https://www.charlando.com.ar`
- `https://charlando.com.ar`
- `https://charlando-cms.sanity.studio`
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- `http://localhost:3333`

## Schema

El schema del post esta en:

```text
sanity-studio/schemaTypes/post.ts
```

Tambien hay una copia en `sanity/schemaTypes/post.ts` por si alguna vez se quiere mover el Studio a otro repo.

Campos:

- `title`: requerido.
- `slug`: requerido, generado desde `title`.
- `excerpt`: requerido.
- `coverImage`.
- `category`.
- `author`.
- `publishedAt`.
- `body`: Portable Text.
- `seoTitle`.
- `seoDescription`.
- `ogImage`.

## Como cargar un nuevo post

1. Entrar a Sanity Studio.
2. Crear un documento nuevo de tipo `Post`.
3. Completar `Title`.
4. Generar el `Slug` desde el titulo.
5. Completar `Excerpt`.
6. Cargar `Cover Image`.
7. Completar `Category`, `Author` y `Published At`.
8. Escribir el contenido en `Body`.
9. Opcional: completar `SEO Title`, `SEO Description` y `OG Image`.
10. Publicar el documento.

La web solo muestra posts publicados que tengan `publishedAt` definido y una fecha menor o igual al momento actual. Los drafts no se muestran.

Si un post no aparece en la web, revisar primero:

- Que tenga `Slug`.
- Que tenga `Published At`.
- Que `Published At` no sea una fecha futura.
- Que el documento este publicado y no solamente guardado como draft.
- Que Vercel tenga las variables `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` y `VITE_SANITY_API_VERSION`.

## URLs

- Listado: `/blog`
- Articulo: `/blog/[slug]`

## Sitemap

Antes de cada build se ejecuta:

```bash
npm run prebuild
```

Ese script consulta Sanity y genera `public/sitemap.xml` con:

- `/`
- `/biblioteca`
- `/blog`
- `/blog/[slug]` para cada post publicado

Si falta `VITE_SANITY_PROJECT_ID`, el sitemap se genera solo con las rutas base.
