import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-foreground text-lg font-bold">
          AgendaFácil NAF
        </div>
        <footer className="text-sm">
          &copy; Unifeso - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
