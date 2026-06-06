import Image from "next/image";

export function Testimonial() {
  return (
    <section className="w-full bg-surface py-20 border-t border-border" id="testimonial">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-darkest">
            Loved by Developers
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            See how developers are saving hours of prep work and landing roles they love.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm md:p-10">
            <blockquote className="text-lg font-medium leading-8 text-text-primary md:text-xl md:leading-9">
              &ldquo;JobBuddy changed how I prepare for interviews. The company research dossiers are incredibly accurate, and the AI-generated interview prep questions matched exactly what I was asked during my final rounds.&rdquo;
            </blockquote>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <Image
                src="/images/user-icon.png"
                alt="Alex Rivera"
                width={48}
                height={48}
                className="rounded-full border border-border bg-surface-secondary object-cover"
              />
              <div className="text-left">
                <div className="text-base font-semibold text-text-primary">
                  Alex Rivera
                </div>
                <div className="text-sm text-text-secondary">
                  Senior Frontend Engineer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
