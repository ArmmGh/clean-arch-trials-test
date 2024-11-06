import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export interface VideoOptions {
  HTMLAttributes: Record<string, any>
  uploadFn?: (file: File) => Promise<string>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType
    }
  }
}

export const Video = Node.create<VideoOptions>({
  name: 'video',

  group: 'block',

  atom: true,

  content: '',

  draggable: true,

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      uploadFn: undefined,
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute('src'),
        renderHTML: (attributes) => {
          if (!attributes.src) {
            return {}
          }
          return { src: attributes.src }
        },
      },
      controls: {
        default: true,
        parseHTML: (element) => element.hasAttribute('controls'),
        renderHTML: (attributes) => {
          if (!attributes.controls) {
            return {}
          }
          return { controls: '' }
        },
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {}
          }
          return { width: attributes.width }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
        getAttrs: (element) => ({
          src: element instanceof HTMLElement ? element.getAttribute('src') : null,
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands, chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run()
        },
    }
  },

  addProseMirrorPlugins() {
    const uploadFn = this.options.uploadFn

    return [
      new Plugin({
        key: new PluginKey('videoDropPlugin'),
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles = event.dataTransfer?.files?.length

              if (!hasFiles || !uploadFn) {
                return false
              }

              const file = event.dataTransfer.files[0]
              if (!file.type.includes('video/')) {
                return false
              }

              event.preventDefault()

              uploadFn(file).then((url) => {
                const { state } = view
                const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos

                if (pos === undefined) return

                const transaction = state.tr.insert(pos, state.schema.nodes.video.create({ src: url }))

                view.dispatch(transaction)
              })

              return true
            },
          },
        },
      }),
    ]
  },
})
