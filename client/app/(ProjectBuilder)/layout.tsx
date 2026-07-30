import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build.web - Project Builder",
  description: "AI builder thats build web apps",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
