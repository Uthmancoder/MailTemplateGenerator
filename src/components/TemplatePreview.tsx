import { Card } from '@/components/ui/card';

interface TemplatePreviewProps {
  html: string;
}

export default function TemplatePreview({ html }: TemplatePreviewProps) {
  return (
    <Card className="p-6 overflow-hidden">
      <div className="bg-slate-100 rounded-lg p-4 min-h-96 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            srcDoc={html}
            title="Email Preview"
            className="w-full h-96 border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">
        Preview of your email template. Responsive design adapts to all screen sizes.
      </p>
    </Card>
  );
}
