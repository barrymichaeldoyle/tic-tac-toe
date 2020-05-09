import { useEffect, useState } from 'react'

interface Output {
  counter: number
  setCounter: (counter: number) => void
}

const useCountdown = (startingAtSeconds = 10): Output => {
  const [counter, setCounter] = useState(startingAtSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter === 0) clearInterval(interval)
    return () => clearInterval(interval);
  }, [counter])

  return { counter, setCounter }
}


export default useCountdown