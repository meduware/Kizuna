import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyRoleStateProps {
  onCreateClick: () => void;
}
export function EmptyRoleState({ onCreateClick }: EmptyRoleStateProps) {
  const translation = useTranslation();
  return (
    <Card className="lg:flex-1 flex items-center justify-center">
      <CardContent className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
          {translation("Select a role to edit")}
        </h3>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          {translation("Or create a new role to get started")}
        </p>
        <Button variant="outline" className="mt-4 gap-2" onClick={onCreateClick}>
          <PlusCircle size={16} />
          {translation("Create Role")}
        </Button>
      </CardContent>
    </Card>
  );
}
