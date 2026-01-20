"use client";

import { Dialog, DialogTrigger } from '@/components/ui/dialog-noclose';
import { useNavigation } from "@/hooks/useNavigation";
import { Row } from "@tanstack/react-table";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Eye, FileSearch, Loader2, MoreHorizontal, MoreVertical, NotebookPen, PenTool } from "lucide-react";
import { useState } from "react";

interface DataTableRowActionsProps<T> {
  row: Row<T>,
  data: T[];
}

export function DataTableRowActions({
  row,
  data
}: DataTableRowActionsProps<any>) {
  const { id, status } = row.original;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => setIsModalOpen(true)}>View Offer Letter</DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {data.map((label: any) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
