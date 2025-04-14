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
import { useTranslation } from "@/hooks/useTranslation";

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
  const translation = useTranslation();
  const filterItems: FilterItem[] = [
    {
      id: "filter-profanity",
      key: "profanity",
      icon: <MessageSquare size={16} />,
      title: translation("Profanity Filter"),
      description: translation("Automatically detect and moderate profane language"),
    },
    {
      id: "filter-spam",
      key: "spam",
      icon: <Repeat size={16} />,
      title: translation("Spam Detection"),
      description: "Detect repeated messages and spam patterns",
    },
    {
      id: "filter-links",
      key: "links",
      icon: <LinkIcon size={16} />,
      title: translation("Link Filter"),
      description: translation("Control which links can be shared in your server"),
    },
    {
      id: "filter-mentions",
      key: "mentions",
      icon: <BadgeAlert size={16} />,
      title: translation("Mass Mention Prevention"),
      description: translation("Prevent users from mentioning too many people at once"),
    },
    {
      id: "filter-new-accounts",
      key: "newAccounts",
      icon: <User size={16} />,
      title: translation("New Account Restrictions"),
      description: translation("Apply stricter rules to newly created accounts"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter size={20} />
          {translation("Content Filter Settings")}
        </CardTitle>
        <CardDescription>
          {translation("Enable or disable automated content filtering features")}
        </CardDescription>
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
                <Label htmlFor="filter-severity">{translation("Filter Sensitivity")}</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {translation("Adjust how strictly the AutoMod enforces content rules")}
              </p>
            </div>
            <div className="sm:w-1/6">
              <Select value={filterSeverity} onValueChange={(value) => onChangeSeverity(value)}>
                <SelectTrigger id="filter-severity">
                  <SelectValue placeholder="Filter Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">{translation("Low")}</SelectItem>
                  <SelectItem value="Medium">{translation("Medium")}</SelectItem>
                  <SelectItem value="High">{translation("High")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
