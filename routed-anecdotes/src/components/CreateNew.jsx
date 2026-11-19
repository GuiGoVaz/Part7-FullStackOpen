import { useNavigate } from "react-router"
import { useField } from '../hooks/index.js'
import { useAnecdotes } from '../hooks/useAnecdotes'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()
  const navigate = useNavigate()
  const { reset: cReset, ...content } = useField('text')
  const { reset: aReset, ...author } = useField('text')
  const { reset: iReset, ...info } = useField('text')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate("/")
  }

  const handleReset = () => {
    cReset()
    aReset()
    iReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input
            name="content"
            {...content}
          />
        </div>
        <div>
          author
          <input
            name="author"
            {...author}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            {...info}
          />
        </div>
        <button>create</button><button type="reset" >reset</button>
      </form>
    </div>
  )
}

export default CreateNew
