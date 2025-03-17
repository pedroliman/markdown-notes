import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No note selected</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a note from the sidebar or create a new one to get started
        </p>
      </div>
    </div>
  );
}
