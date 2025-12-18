import { ArchitectInfo, DesignerInfo } from '@/types/destination';
import { ExternalLink, Building2, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ArchitectureSectionProps {
  architect?: ArchitectInfo;
  designer?: DesignerInfo;
  yearBuilt?: number;
  architecturalStyle?: string;
  designHighlights?: string[];
}

function PersonCard({
  person,
  type,
}: {
  person: ArchitectInfo | DesignerInfo;
  type: 'architect' | 'designer';
}) {
  const Icon = type === 'architect' ? Building2 : Palette;
  const label = type === 'architect' ? 'Architecture' : 'Interior Design';

  return (
    <Card className="overflow-hidden bg-card shadow-soft border-0">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {person.image && (
            <div className="sm:w-32 md:w-40 flex-shrink-0">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-32 sm:h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 p-4 md:p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide mb-2">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
            <h4 className="font-display text-xl font-semibold text-foreground mb-1">
              {person.name}
            </h4>
            {person.firm && (
              <p className="text-sm text-primary mb-3">{person.firm}</p>
            )}
            {person.bio && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {person.bio}
              </p>
            )}
            {person.notableWorks && person.notableWorks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {person.notableWorks.slice(0, 3).map((work, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                  >
                    {work}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ArchitectureSection({
  architect,
  designer,
  yearBuilt,
  architecturalStyle,
  designHighlights,
}: ArchitectureSectionProps) {
  if (!architect && !designer && !designHighlights?.length) return null;

  return (
    <section id="architecture" className="py-12 md:py-16 bg-sand/50">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Architecture & Design
            </h2>
            {(yearBuilt || architecturalStyle) && (
              <p className="text-muted-foreground mt-2">
                {yearBuilt && <span>Built {yearBuilt}</span>}
                {yearBuilt && architecturalStyle && <span> · </span>}
                {architecturalStyle && <span>{architecturalStyle}</span>}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {architect && <PersonCard person={architect} type="architect" />}
          {designer && <PersonCard person={designer} type="designer" />}
        </div>

        {designHighlights && designHighlights.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Design Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {designHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background shadow-soft"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
