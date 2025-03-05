export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex justify-center items-center bg-loginImg bg-no-repeat bg-cover bg-top">
      {children}
    </main>
  );
}
