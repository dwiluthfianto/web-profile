"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProjectMutations } from "@/hooks/useProject";

export function DeleteProjectDialog({
  documentId,
  open,
  onOpenChange,
}: {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { deleteProjectMutation } = useProjectMutations();

  const handleDelete = async () => {
    await deleteProjectMutation.mutateAsync(documentId);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this project post?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please confirm if you’d like to
            proceed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' className='cursor-pointer'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            variant={"destructive"}
            onClick={handleDelete}
            disabled={deleteProjectMutation.isPending}
            className='cursor-pointer'
          >
            {deleteProjectMutation.isPending ? "Deleting.." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
