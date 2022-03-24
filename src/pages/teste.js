import { useRouter } from "next/router";

export default function Teste() {
    const router = useRouter()

    return (
        <div>
            <h1>Home</h1>
            <h2>push()</h2>
            <p>
            <button onClick={() => router.push('/')}>
          Go to the feedback page
        </button>
            </p>
            <p>
        <input
          type="checkbox"
          onChange={() => router.push('/cataloguing')}
        ></input> Check me to go to the feedback page
      </p>
      <br />
      <h2>replace()</h2>
      <div>
        <button onClick={() => router.replace('/index')}>
          Go to the feedback page and not go back
        </button>
      </div>


        </div>
    )
}