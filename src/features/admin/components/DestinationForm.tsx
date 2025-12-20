import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toSlug, toTitleCase } from "@/lib/utils";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DropdownOptions {
  cities: string[];
  countries: string[];
  neighborhoods: string[];
  brands: string[];
}

interface DestinationFormData {
  name: string;
  slug: string;
  city: string;
  country: string;
  neighborhood: string;
  brand: string;
  category: string;
  description: string;
  address: string;
  website: string;
}

interface DestinationFormProps {
  initialData?: Partial<DestinationFormData>;
  onSubmit: (data: DestinationFormData) => Promise<void>;
  isLoading?: boolean;
}

export function DestinationForm({
  initialData,
  onSubmit,
  isLoading = false,
}: DestinationFormProps) {
  const [formData, setFormData] = useState<DestinationFormData>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    city: initialData?.city || "",
    country: initialData?.country || "",
    neighborhood: initialData?.neighborhood || "",
    brand: initialData?.brand || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    website: initialData?.website || "",
  });

  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    cities: [],
    countries: [],
    neighborhoods: [],
    brands: [],
  });

  const [optionsLoading, setOptionsLoading] = useState(true);

  // Fetch dropdown options from normalized tables (efficient queries)
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        setOptionsLoading(true);

        // Query normalized tables directly - much more efficient than
        // querying the entire destinations table and extracting unique values
        const [citiesResult, countriesResult, neighborhoodsResult, brandsResult] = await Promise.all([
          supabase.from('cities').select('name'),
          supabase.from('countries').select('name'),
          supabase.from('neighborhoods').select('name'),
          supabase.from('brands').select('name'),
        ]);

        // Extract names and sort alphabetically
        const cities = (citiesResult.data?.map(c => c.name) || []).sort();
        const countries = (countriesResult.data?.map(c => c.name) || []).sort();
        const neighborhoods = (neighborhoodsResult.data?.map(n => n.name) || []).sort();
        const brands = (brandsResult.data?.map(b => b.name) || []).sort();

        setDropdownOptions({ cities, countries, neighborhoods, brands });
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchDropdownOptions();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !initialData?.slug) {
      setFormData(prev => ({
        ...prev,
        slug: toSlug(formData.name),
      }));
    }
  }, [formData.name, initialData?.slug]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof DestinationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: toTitleCase(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter destination name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="auto-generated-from-name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>City *</Label>
          <SearchableSelect
            options={dropdownOptions.cities}
            value={formData.city}
            onChange={(value) => handleSelectChange("city", value)}
            placeholder="Select city..."
            searchPlaceholder="Search cities..."
            customLabel="Add new city"
            disabled={optionsLoading}
          />
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <SearchableSelect
            options={dropdownOptions.countries}
            value={formData.country}
            onChange={(value) => handleSelectChange("country", value)}
            placeholder="Select country..."
            searchPlaceholder="Search countries..."
            customLabel="Add new country"
            disabled={optionsLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Neighborhood</Label>
          <SearchableSelect
            options={dropdownOptions.neighborhoods}
            value={formData.neighborhood}
            onChange={(value) => handleSelectChange("neighborhood", value)}
            placeholder="Select neighborhood..."
            searchPlaceholder="Search neighborhoods..."
            customLabel="Add new neighborhood"
            disabled={optionsLoading}
          />
        </div>

        <div className="space-y-2">
          <Label>Brand</Label>
          <SearchableSelect
            options={dropdownOptions.brands}
            value={formData.brand}
            onChange={(value) => handleSelectChange("brand", value)}
            placeholder="Select brand..."
            searchPlaceholder="Search brands..."
            customLabel="Add new brand"
            disabled={optionsLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="e.g., Restaurant, Hotel, Museum"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter a description..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Destination"}
        </Button>
      </div>
    </form>
  );
}
