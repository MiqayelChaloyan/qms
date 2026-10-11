import Image from "next/image";
import Link from "next/link";
import { PAGE_CONTAINER } from "@/lib/page-container";

const BLOG_POSTS = {
  featured: {
    image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_3.png",
    date: "March 15",
    readTime: "10 min",
    title: "Common UI mistakes developers make and how to fix them",
    excerpt:
      "Avoid design inconsistencies and improve user experience with simple, practical UI improvements.",
  },
  secondary: [
    {
      image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_2.png",
      date: "March 12",
      readTime: "7 min",
      title: "Building reusable components for mobile apps",
    },
    {
      image: "https://assets.prebuiltui.com/components/blog-sections/blogImg_1.png",
      date: "March 12",
      readTime: "5 min",
      title: "Improving app performance with best practices",
    },
  ],
} as const;

function ReadTimeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.5 1.5h3m-1.5 9 2.25-2.25M9 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaRow({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-sm text-white">{date}</span>
      <div className="h-3 w-px bg-white" />
      <div className="flex items-center gap-1.5">
        <ReadTimeIcon />
        <span className="text-sm text-white">{readTime}</span>
      </div>
    </div>
  );
}

function ReadMoreButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#"
      className={`w-fit rounded-full border border-zinc-800 px-5 py-1.5 text-sm text-white transition-colors hover:bg-zinc-900 ${className}`}
    >
      Read more
    </Link>
  );
}

export function BlogSection() {
  const { featured, secondary } = BLOG_POSTS;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="bg-black py-16"
    >
      <div className={`${PAGE_CONTAINER} flex flex-col items-center`}>
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="mb-5 rounded-full bg-zinc-800 px-6 py-1.5 text-sm text-white">
          Blog
        </span>
        <h2
          id="blog-heading"
          className="max-w-[530px] text-[40px] leading-tight font-medium text-white"
        >
          Build better interfaces with modern dev insights
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <article className="group row-span-1 flex h-full flex-col overflow-hidden rounded-[18px] border border-zinc-800 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 md:row-span-2">
          <div className="relative h-52 w-full">
            <Image
              src={featured.image}
              alt=""
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col p-6">
            <MetaRow date={featured.date} readTime={featured.readTime} />
            <h3 className="mb-3 max-w-[360px] text-lg leading-snug font-medium text-white">
              {featured.title}
            </h3>
            <p className="mb-5 max-w-[370px] text-sm leading-tight font-light text-white/80">
              {featured.excerpt}
            </p>
            <ReadMoreButton />
          </div>
        </article>

        {secondary.map((post, index) => (
          <article
            key={post.title}
            className="group flex flex-col overflow-hidden rounded-[18px] border border-zinc-800 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 sm:flex-row sm:gap-5"
          >
            <Image
              src={post.image}
              alt=""
              width={520}
              height={384}
              className="h-48 w-full rounded-2xl object-cover sm:h-auto sm:w-[220px] lg:w-[260px]"
            />
            <div className="flex flex-col py-3 pr-2 max-md:pl-4 md:py-5">
              <MetaRow date={post.date} readTime={post.readTime} />
              <h3 className="mb-3 text-lg font-medium text-white">{post.title}</h3>
              {index === 1 ? (
                <div className="mt-auto">
                  <ReadMoreButton />
                </div>
              ) : (
                <ReadMoreButton />
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="#"
          className="cursor-pointer rounded-full border border-zinc-800 px-6 py-2 text-sm text-white transition-colors hover:bg-zinc-900"
        >
          See more
        </Link>
      </div>
      </div>
    </section>
  );
}
