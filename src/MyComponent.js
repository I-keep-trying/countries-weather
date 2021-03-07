import React, { useEffect, useState } from 'react'
import { CPromise, CanceledError } from 'c-promise2'
import cpFetch from 'cp-fetch'

function MyComponent({ url, state }) {
  const [text, setText] = useState('fetching...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('mount')
    const promise = CPromise.from(function* () {
      try {
        const response = yield cpFetch(url)
        const json = yield response.json()
        console.log('response',json)
       // yield CPromise.delay(1000)
        setText(`Success: ${JSON.stringify(json)}`)
        setIsLoading(false)
      } catch (err) {
        console.warn(err)
        CanceledError.rethrow(err)
        setText(`Failed: ${err}`)
      }
    })

    return () => {
      console.log('unmount')
      promise.cancel()
    }
  }, [])

  return (
    <div>
      <p>{text}</p>
      <br />
      <p>{state.timestamp}</p>
      <br />
      {JSON.stringify(isLoading)}
      {/*  <button onClick={onClick}>Remount</button> */}
    </div>
  )
}

export default MyComponent
