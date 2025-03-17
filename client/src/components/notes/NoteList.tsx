import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Note } from "@shared/schema";

interface NoteListProps {
  notes: Note[];
  selectedId: number | null;
  onSelect: (note: Note) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export default function NoteList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  isLoading,
}: NoteListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No notes found
      </div>
    );
  }

  return (
    <ScrollArea>
      <div className="space-y-1 p-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "group flex items-center justify-between rounded-md px-3 py-2 text-sm",
              selectedId === note.id
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            )}
            role="button"
            onClick={() => onSelect(note)}
          >
            <div className="flex-1 truncate">
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(note.lastModified), "MMM d, yyyy h:mm a")}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
