import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useChannelActions } from "@/hooks/settings/useChannelActions";
import { useTranslation } from "@/hooks/useTranslation";
import { PlusCircle } from "lucide-react";

export function EmptyChannelState({
  handleDialogOpen,
}: {
  handleDialogOpen: (open: boolean) => void;
}) {
  const translation = useTranslation();

  return (
    <Card className="lg:flex-1 flex items-center justify-center">
      <CardContent className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
          {translation("Select a Channel to edit")}
        </h3>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          {translation("Or create a new channel to get started")}
        </p>
        <Button
          variant="outline"
          className="mt-4 gap-2"
          onClick={() => handleDialogOpen(true)}
        >
          <PlusCircle size={16} />
          {translation("Create Channel")}
        </Button>
      </CardContent>
    </Card>
  );
}
