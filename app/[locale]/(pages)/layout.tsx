import { Footer } from "@/components/features/footer";
export default function PagesLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="bg-paper flex min-h-svh flex-col">
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
