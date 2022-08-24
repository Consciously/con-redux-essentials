import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { useGetPostQuery } from '../../features/api/apiSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <PostAuthor userId={post.user} />
          <p className="post-content">{post.content}</p>
          <ReactionButtons post={post} />
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    )
  }

  return <section>{content}</section>
}

export default SinglePostPage
