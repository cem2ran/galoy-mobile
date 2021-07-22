import i18n from "i18n-js"
import * as en from "./en.json"
import * as es from "./es.json"

type ValidPaths<T> = keyof T extends never
  ? never
  : {
      [K in keyof T]: T[K] extends never
        ? never
        : T[K] extends Record<string | number | symbol, unknown>
        ? K extends string
          ? //@ts-expect-error // wip
            `${K}.${ValidPaths<T[K]>}`
          : never
        : K
    }[keyof T]

export type keys = ValidPaths<typeof en>

i18n.fallbacks = true
i18n.translations = { en, es }
