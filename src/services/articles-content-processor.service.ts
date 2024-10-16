// import { JSDOM } from 'jsdom'

// interface ExtractedImage {
//   src: string
//   alt: string
//   outerHTML: string
// }

// export const extractImagesFromTiptapContent = (content: string): ExtractedImage[] => {
//   try {
//     const dom = new JSDOM(content)
//     const doc = dom.window.document
//     const images = doc.getElementsByTagName('img')

//     return Array.from(images).map((img) => ({
//       src: img.src,
//       alt: img.alt,
//       outerHTML: img.outerHTML,
//     }))
//   } catch (error) {
//     console.log('error: ', error)
//   }

//   return []
// }

// // import { IArticlesContentProcessorService } from '@/application/services/articles-content-processor.interface'

// // @injectable()
// // export class ArticlesContentProcessorService implements IArticlesContentProcessorService {
// //   extractImagesFromTiptapContent(content: string) {
// //     //TODO: add imlements IArticlesContentProcessorService
// //     console.log('Here extractImagesFromTiptapContent')
// //     const parser = new DOMParser()
// //     const doc = parser.parseFromString(content, 'text/html')
// //     const images = doc.getElementsByTagName('img')

// //     return Array.from(images).map((img) => ({
// //       src: img.src,
// //       alt: img.alt,
// //       element: img,
// //     }))
// //   }
// // }
