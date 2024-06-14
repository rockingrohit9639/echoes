export default async function Home() {
  return (
    <main className="grid min-h-screen w-full grid-cols-2">
      <div className="bg-dark border-border h-full w-full border-r border-dashed p-4">
        <h1 className="text-2xl font-bold">Heading</h1>
        <p className="text-muted-foreground">I am faded</p>
      </div>
      <div className="h-ull bg-background w-full">
        <p className="text-warning">I am warning</p>
        <p className="text-success">I am success</p>
        <p className="text-error">I am error</p>
      </div>
    </main>
  );
}
