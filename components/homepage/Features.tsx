import Image from "next/image";

export function Features() {
  const items = [
    {
      title: "Find matching roles",
      description: "Score jobs instantly based on your profile and skills using GPT-4o. Highlight matching skills and surface what's missing.",
    },
    {
      title: "Track your progress",
      description: "Monitor your overall job hunt with average match rates, companies researched, and completed interview preparation sessions.",
    },
    {
      title: "Custom preferences",
      description: "Filter and sort discovered roles by remote preference, estimated salary, location, and match score.",
    },
  ];

  return (
    <section className="w-full bg-surface py-20 border-t border-border" id="features">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-darkest sm:text-4xl">
              Manage Your Job Search With Ease
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Stop maintaining messy spreadsheets. JobBuddy organizes your job search automatically, pulling in roles and scoring them against your career profile.
            </p>

            <div className="mt-10 space-y-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent font-semibold text-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-secondary p-2 shadow-lg">
              <Image
                src="/images/jobs-lists.png"
                alt="Jobs list interface preview"
                width={1200}
                height={800}
                className="rounded-xl border border-border-light object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
