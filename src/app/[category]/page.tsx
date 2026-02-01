import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getDataForCategory } from "@/lib/data";
import { CategoryClient } from "@/components/category-client";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Not Found" };
  return {
    title: `${cat.title} — TnTisland`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const subCategories = getDataForCategory(category);
  const totalItems = subCategories.reduce((acc, s) => acc + s.count, 0);
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-10 md:pt-16 pb-10">
        <Link
          href="/"
          className="label-mono text-[var(--faded)] hover:text-[var(--fg)] transition-colors inline-block mb-8"
        >
          &larr; Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-[var(--fg)]">
              {cat.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[var(--faded)] text-sm leading-relaxed">
              {cat.description}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="label-mono text-[var(--faded)]">
                {totalItems.toLocaleString()} listings
              </span>
              <span className="text-[var(--rule)]">/</span>
              <span className="label-mono text-[var(--faded)]">
                {subCategories.length} sub-categories
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="editorial-rule" />

      {/* Content */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 md:py-14">
        <CategoryClient subCategories={subCategories} />
      </section>
    </>
  );
}
