import * as LucideIcons from 'lucide-react';
import { MicroDescription } from '@/types/destination';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  description: string;
  microDescriptions: MicroDescription[];
}

export function AboutSection({ description, microDescriptions }: AboutSectionProps) {
  const paragraphs = description.split('\n\n');

  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              About
            </h2>
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    index === 0 && "text-lg text-foreground/80"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Micro Descriptions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {microDescriptions.map((item, index) => {
                  const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Info;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card shadow-soft"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
