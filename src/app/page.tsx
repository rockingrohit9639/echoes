export default async function Home() {
  return (
    <main className="grid min-h-screen w-full grid-cols-2">
      <div className="h-full w-full border-r border-dashed border-border bg-dark p-4">
        <h1 className="text-2xl font-bold">Heading</h1>
        <p className="text-muted-foreground">I am faded</p>
      </div>
      <div className="h-ull w-full space-y-2 bg-background"></div>
    </main>
  );
}
