import { NavbarApp } from "@/components/app-navbar";
import { FooterSection } from "@/components/section/footer-section";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='max-w-3xl mx-auto'>
      <NavbarApp />
      {children}
      <FooterSection />
    </div>
  );
}
