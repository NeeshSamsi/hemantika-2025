// ./src/utils/getLocales.ts

import { Client, Content } from "@prismicio/client"

export async function getLocalesForPath(
  client: Client<Content.AllDocumentTypes>,
  pathname: string
) {
  const repository = await client.getRepository()
  const first = pathname.split("/").filter(Boolean)[0]

  return repository.languages.map((lang) => {
    const rest = pathname
      .split("/")
      .filter(Boolean)
      .slice(first ? 1 : 0)
      .join("/")
    const url = `/${lang.id}${rest ? "/" + rest : ""}`
    return {
      lang: lang.id,
      url,
      lang_name: lang.name,
    }
  })
}
