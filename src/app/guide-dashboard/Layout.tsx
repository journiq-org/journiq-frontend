// app/guide-dashboard/layout.tsx
import GuideLayout from "@/components/guideLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GuideLayout>{children}</GuideLayout>;
}
