import { AnimatedSection } from '@/components/ui/AnimatedSection';

export type PolicyBlock = string | string[];

export interface PolicySection {
  title: string;
  blocks: PolicyBlock[];
}

interface PolicyPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: PolicySection[];
}

export function PolicyPage({ title, lastUpdated, intro, sections }: PolicyPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text md:text-4xl">{title}</h1>
          <p className="mt-3 text-text-light">Last updated: {lastUpdated}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-sm">
          {intro && <p className="text-text-light leading-relaxed">{intro}</p>}

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-text">{section.title}</h2>
                <div className="mt-2 space-y-3">
                  {section.blocks.map((block, i) =>
                    Array.isArray(block) ? (
                      <ul key={i} className="list-disc space-y-1 pl-5 text-text-light leading-relaxed">
                        {block.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} className="text-text-light leading-relaxed">
                        {block}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}