
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  clientName: string;
  isDeleting: boolean;
}

export default function DeleteClientDialog({
  open,
  onOpenChange,
  onConfirm,
  clientName,
  isDeleting
}: DeleteClientDialogProps) {
  const handleClose = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar al cliente <strong>{clientName}</strong>. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
