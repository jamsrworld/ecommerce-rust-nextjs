import React from 'react'

type Props = {
  error:unknown
}

export const FetchError = (props:Props) => {
  const { error } = props
  console.log("error:->", error)
  return <span>Something went wrong.</span>
}

