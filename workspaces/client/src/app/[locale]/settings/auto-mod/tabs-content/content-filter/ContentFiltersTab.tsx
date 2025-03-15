import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Filter,
  MessageSquare,
  Repeat,
  Link as LinkIcon,
  BadgeAlert,
  User,
  Gauge,
} from "lucide-react";
import { ContentFilterItem } from "./ContentFilterItem";
import { ReactNode } from "react";
import { ContentFilters } from "@shared/types";

interface ContentFiltersTabProps {
  contentFilters: ContentFilters;
  onToggleFilter: (key: keyof ContentFilters) => void;
  filterSeverity: string;
  onChangeSeverity: (value: string) => void;
}

interface FilterItem {
  id: string;
  key: keyof ContentFilters;
  icon: ReactNode;
  title: string;
  description: string;
}

export function ContentFiltersTab({
  contentFilters,
  onToggleFilter,
  filterSeverity,
  onChangeSeverity,
}: ContentFiltersTabProps) {
  const filterItems: FilterItem[] = [
    {
      id: "filter-profanity",
      key: "profanity",
      icon: <MessageSquare size={16} />,
      title: "Profanity Filter",
      description: "Automatically detect and moderate profane language",
    },
    {
      id: "filter-spam",
      key: "spam",
      icon: <Repeat size={16} />,
      title: "Spam Detection",
      description: "Detect repeated messages and spam patterns",
    },
    {
      id: "filter-links",
      key: "links",
      icon: <LinkIcon size={16} />,
      title: "Link Filter",
      description: "Control which links can be shared in your server",
    },
    {
      id: "filter-mentions",
      key: "mentions",
      icon: <BadgeAlert size={16} />,
      title: "Mass Mention Prevention",
      description: "Prevent users from mentioning too many people at once",
    },
    {
      id: "filter-new-accounts",
      key: "newAccounts",
      icon: <User size={16} />,
      title: "New Account Restrictions",
      description: "Apply stricter rules to newly created accounts",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter size={20} />
          Content Filter Settings
        </CardTitle>
        <CardDescription>Enable or disable automated content filtering features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {filterItems.map((item, index) => (
            <div key={item.id}>
              <ContentFilterItem
                id={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isEnabled={contentFilters[item.key]}
                onToggle={() => onToggleFilter(item.key)}
              />
              {index < filterItems.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Gauge size={16} />
                <Label htmlFor="filter-severity">Filter Sensitivity</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Adjust how strictly the AutoMod enforces content rules
              </p>
            </div>
            <div className="sm:w-1/6">
              <Select value={filterSeverity} onValueChange={(value) => onChangeSeverity(value)}>
                <SelectTrigger id="filter-severity">
                  <SelectValue placeholder="Filter Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
