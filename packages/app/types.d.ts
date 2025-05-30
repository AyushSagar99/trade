import { config } from '@my/config'

export type Conf = typeof config

declare module '@my/ui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare global {
  type LocalImageSource =
    | {
        src: string
        width: number
        height: number
        blurDataURL: string
        blurWidth: number
        blurHeight: number
      }
    | number

  declare module '*.png' {
    const content: LocalImageSource
    export default content
  }

  declare module '*.jpg' {
    const content: LocalImageSource
    export default content
  }

  declare module '*.jpeg' {
    const content: LocalImageSource
    export default content
  }

  declare module '*.gif' {
    const content: LocalImageSource
    export default content
  }

  declare module '*.svg' {
    const content: LocalImageSource
    export default content
  }

  declare module '*.webp' {
    const content: LocalImageSource
    export default content
  }
}

export {}