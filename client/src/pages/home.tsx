import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Note } from "@shared/schema";
import NoteList from "@/components/notes/NoteList";
import EmptyState from "@/components/notes/EmptyState";
import CodeMirrorEditor from "@/components/editor/CodeMirrorEditor";

export default function Home() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingTitle, setEditingTitle] = useState("");

  const { data: notes = [], isLoading: isLoadingNotes } = useQuery<Note[]>({
    queryKey: [searchQuery ? "/api/notes/search" : "/api/notes", searchQuery] as const,
    queryFn: async ({ queryKey }) => {
      const [path, query] = queryKey as [string, string | undefined];
      const url = query ? `${path}?q=${encodeURIComponent(query)}` : path;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error("Failed to fetch notes");
      return res.json();
    },
  });

  const createNote = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/notes", {
        title: "Untitled Note",
        content: "",
      });
      return res.json();
    },
    onSuccess: (note: Note) => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setSelectedNoteId(note.id);
      setEditingTitle("Untitled Note");
      setEditingContent("");
      toast({
        title: "Note created",
        description: "New note has been created successfully",
      });
    },
  });

  const updateNote = useMutation({
    mutationFn: async ({ id, title, content }: { id: number; title: string; content: string }) => {
      const res = await apiRequest("PATCH", `/api/notes/${id}`, { title, content });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setSelectedNoteId(null);
      setEditingTitle("");
      setEditingContent("");
      toast({
        title: "Note deleted",
        description: "Note has been deleted successfully",
      });
    },
  });

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleNoteSelect = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const handleTitleChange = (title: string) => {
    setEditingTitle(title);
    if (selectedNoteId) {
      updateNote.mutate({ id: selectedNoteId, title, content: editingContent });
    }
  };

  const handleContentChange = (content: string) => {
    setEditingContent(content);
    if (selectedNoteId) {
      updateNote.mutate({ id: selectedNoteId, title: editingTitle, content });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border space-y-4">
          <Button
            onClick={() => createNote.mutate()}
            className="w-full"
            disabled={createNote.isPending}
          >
            New Note
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <NoteList
            notes={notes}
            selectedId={selectedNoteId}
            onSelect={handleNoteSelect}
            onDelete={(id) => deleteNote.mutate(id)}
            isLoading={isLoadingNotes}
          />
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="border-b border-border p-4">
              <Input
                value={editingTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-xl font-semibold bg-transparent border-0 px-0 focus-visible:ring-0"
                placeholder="Note title"
              />
            </div>
            <div className="flex-1 flex">
              <CodeMirrorEditor
                value={editingContent}
                onChange={handleContentChange}
              />
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}