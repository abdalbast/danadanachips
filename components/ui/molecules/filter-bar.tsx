'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

export interface FilterBarProps {
  filters: {
    puffType?: string;
    heatLevel?: string;
    size?: string;
    halalOnly?: boolean;
  };
  onFilterChange: (key: string, value: string | boolean | undefined) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(filters).some((value) =>
    value !== undefined && value !== false && value !== ''
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Puff Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="puffType" className="text-sm font-medium">
            Puff Type
          </Label>
          <Select
            value={filters.puffType || 'all'}
            onValueChange={(value) =>
              onFilterChange('puffType', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger id="puffType">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="light">Light & Crispy</SelectItem>
              <SelectItem value="big">Big & Bold</SelectItem>
              <SelectItem value="extra-puffy">Extra Puffy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Heat Level Filter */}
        <div className="space-y-2">
          <Label htmlFor="heatLevel" className="text-sm font-medium">
            Heat Level
          </Label>
          <Select
            value={filters.heatLevel || 'all'}
            onValueChange={(value) =>
              onFilterChange('heatLevel', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger id="heatLevel">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="0">No Heat</SelectItem>
              <SelectItem value="1">Mild</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Hot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Filter */}
        <div className="space-y-2">
          <Label htmlFor="size" className="text-sm font-medium">
            Size
          </Label>
          <Select
            value={filters.size || 'all'}
            onValueChange={(value) =>
              onFilterChange('size', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="25g">25g</SelectItem>
              <SelectItem value="50g">50g</SelectItem>
              <SelectItem value="100g">100g</SelectItem>
              <SelectItem value="150g">150g</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Halal Only Toggle */}
        <div className="space-y-2">
          <Label htmlFor="halal" className="text-sm font-medium">
            Halal Certified
          </Label>
          <Select
            value={filters.halalOnly ? 'yes' : 'all'}
            onValueChange={(value) =>
              onFilterChange('halalOnly', value === 'yes')
            }
          >
            <SelectTrigger id="halal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="yes">Halal Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

