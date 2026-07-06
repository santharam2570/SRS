import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NotFoundCardProps {
  title: string;
  message: string;
  backHref: string;
  backLabel?: string;
}

export function NotFoundCard({ title, message, backHref, backLabel = "Go Back" }: NotFoundCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-slate-500">{message}</p>
        <Link href={backHref} className="mt-6">
          <Button variant="outline">{backLabel}</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
