import { BusinessHours } from '@/types/destination';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Navigation,
  Copy,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LocationSectionProps {
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  hours: BusinessHours;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function getCurrentDay(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

export function LocationSection({
  address,
  city,
  country,
  phone,
  email,
  website,
  hours,
  coordinates,
}: LocationSectionProps) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const currentDay = getCurrentDay();
  const todayHours = hours[currentDay as keyof BusinessHours] || 'Closed';

  const copyAddress = () => {
    navigator.clipboard.writeText(`${address}, ${city}, ${country}`);
  };

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`,
      '_blank'
    );
  };

  return (
    <section id="location" className="py-12 md:py-16 bg-sand/50">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
          Location & Contact
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map placeholder */}
          <Card className="overflow-hidden bg-card shadow-soft border-0">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] bg-muted">
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${coordinates.lng},${coordinates.lat},14,0/600x450?access_token=pk.placeholder`}
                  alt="Map"
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {city}, {country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {city}, {country}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                    className="flex-shrink-0 h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={openMaps}
                  className="w-full mt-4 gap-2 rounded-full"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Hours */}
          <div className="space-y-4">
            {/* Hours */}
            <Card className="bg-card shadow-soft border-0">
              <CardContent className="p-4">
                <Collapsible open={hoursOpen} onOpenChange={setHoursOpen}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">
                            {todayHours === 'Closed' ? 'Closed Today' : `Open · ${todayHours}`}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {currentDay}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform",
                          hoursOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                      {dayNames.map((day) => {
                        const dayHours = hours[day as keyof BusinessHours];
                        const isToday = day === currentDay;
                        return (
                          <div
                            key={day}
                            className={cn(
                              "flex justify-between text-sm py-1.5 px-2 rounded",
                              isToday && "bg-secondary"
                            )}
                          >
                            <span
                              className={cn(
                                "capitalize",
                                isToday ? "font-medium text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {day}
                            </span>
                            <span
                              className={cn(
                                isToday ? "font-medium text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {dayHours || 'Closed'}
                            </span>
                          </div>
                        );
                      })}
                      {hours.notes && (
                        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                          {hours.notes}
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Contact buttons */}
            {phone && (
              <Card className="bg-card shadow-soft border-0">
                <CardContent className="p-4">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {phone}
                      </p>
                      <p className="text-xs text-muted-foreground">Call</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            )}

            {email && (
              <Card className="bg-card shadow-soft border-0">
                <CardContent className="p-4">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {email}
                      </p>
                      <p className="text-xs text-muted-foreground">Email</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            )}

            {website && (
              <Card className="bg-card shadow-soft border-0">
                <CardContent className="p-4">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        Visit Website
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {website.replace(/^https?:\/\//, '')}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
