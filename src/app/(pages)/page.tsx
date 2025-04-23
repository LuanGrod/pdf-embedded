import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Home page</h1>
        <div>
          <h2>bloqueando copia</h2>
          <p className="nocopy">
            Incididunt laboris labore duis id amet. Amet fugiat exercitation id Lorem cillum mollit cillum culpa
            excepteur. Cillum ipsum nisi voluptate amet nulla sit fugiat laboris dolor.
          </p>
        </div>

        <div>
          <h2>não bloqueando copia</h2>
          <p>
            Officia enim aliquip elit amet tempor et adipisicing consequat minim ipsum qui. Velit mollit sit do duis
            aliqua. Fugiat ex anim sint Lorem ad ea ipsum magna anim minim proident commodo. Ut laborum fugiat sunt
            sunt. Culpa incididunt proident fugiat laboris est occaecat consequat. Id cupidatat esse aliquip cupidatat
            culpa incididunt exercitation aute sit.
          </p>
        </div>
      </main>
    </>
  );
}
