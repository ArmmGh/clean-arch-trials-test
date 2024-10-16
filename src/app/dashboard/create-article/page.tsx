import Main from '@/components/layout/Main'
import ArticleEditor from './components/ArticleEditor'

export default function CreateArticle() {
  return (
    <Main>
      <header>Create Article</header>

      <div>
        <ArticleEditor />
      </div>
    </Main>
  )
}
