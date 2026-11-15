import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { Header } from "@/components/layout/Header";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <Header />
      <main className="page-enter w-full min-w-0 flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
