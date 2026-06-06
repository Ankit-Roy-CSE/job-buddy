import Image from "next/image";

export function Confidence() {
  const points = [
    {
      title: "Deep Company Research",
      description: "Our autonomous browser agent visits company homepages, tech blogs, and culture pages to compile a structured employer briefing.",
    },
    {
      title: "Tailored talking points",
      description: "Get candidate-specific strategies connecting your exact background to their active product challenges and engineering stack.",
    },
    {
      title: "Reframe missing skills",
      description: "Address gaps constructively. Learn how to frame missing requirements by leveraging adjacent experiences and your learning speed.",
    },
  ];

  return (
    <section className="w-full bg-surface-secondary py-20 border-t border-border" id="confidence">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Image Content */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lg">
              <Image
                src="/images/agnet-log.png"
                alt="Agent logs preview"
                width={1200}
                height={800}
                className="rounded-xl border border-border-light object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-darkest sm:text-4xl">
              Apply With More Confidence
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              Don&apos;t just send resumes. Walk into every interview armed with deep company insights and a personalized strategy that highlights your unique edge.
            </p>

            <div className="mt-10 space-y-6">
              {points.map((point, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-4">
                  <h3 className="text-base font-semibold text-text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
