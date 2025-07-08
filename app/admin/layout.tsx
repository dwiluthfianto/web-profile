import { NavbarAdmin } from "@/components/admin-navbar";
import { FooterSection } from "@/components/section/footer-section";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='max-w-3xl mx-auto '>
      <NavbarAdmin />
      {children}
      <FooterSection />
    </section>
  );
}
