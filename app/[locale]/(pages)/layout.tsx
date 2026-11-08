import { Footer } from "@/components/features/footer";
import { Nav } from "@/components/features/nav";
export default function PagesLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <Nav />
      <div className="bg-paper flex min-h-svh flex-col">
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
}
