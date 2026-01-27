import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Eye, Code, Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import TemplateForm from '@/components/TemplateForm';
import TemplatePreview from '@/components/TemplatePreview';
import CodeDisplay from '@/components/CodeDisplay';

interface Section {
  id: string;
  heading: string;
  content: string;
}

interface AppBadge {
  id: string;
  type: 'google' | 'apple';
  link: string;
}

interface DownloadLink {
  id: string;
  text: string;
  url: string;
  icon?: string;
}

interface TemplateData {
  title: string;
  subtitle: string;
  headerColor: string;
  bodyText: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  logoUrl: string;
  logoWidth: number;
  sections: Section[];
  appBadges: AppBadge[];
  downloadLinks: DownloadLink[];
  footerText: string;
  footerColor: string;
  fontFamily: string;
  accentColor: string;
}

const defaultTemplate: TemplateData = {
  title: 'Welcome to Our Platform',
  subtitle: 'Get started with our amazing service',
  headerColor: '#4F46E5',
  bodyText: 'We\'re excited to have you on board. Explore our features and start creating amazing email templates today.',
  buttonText: 'Get Started',
  buttonLink: 'https://example.com',
  buttonColor: '#003496',
  logoUrl: '',
  logoWidth: 60,
  sections: [],
  appBadges: [],
  downloadLinks: [],
  footerText: 'If the button doesn\'t work, copy this link: https://example.com',
  footerColor: '#999999',
  fontFamily: 'Inter',
  accentColor: '#FF6B6B',
};

export default function MailTemplateGenerator() {
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplate);
  const [sections, setSections] = useState<Section[]>([]);
  const [appBadges, setAppBadges] = useState<AppBadge[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<DownloadLink[]>([]);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const generateTemplateHtml = () => {
    const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateData.title || 'Email Template'}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: '${templateData.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
      color: #1f2937;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: #003496;
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .logo {
      margin-bottom: 20px;
    }
    .logo img {
      width: ${templateData.logoWidth}px;
      height: auto;
      display: inline-block;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
      margin: 0;
    }
    .subtitle {
      padding: 30px 40px;
      text-align: center;
      color: #666666;
      font-size: 16px;
      line-height: 1.6;
      border-bottom: 1px solid #f0f0f0;
    }
    .button-container {
      text-align: center;
      padding: 30px 40px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: ${templateData.buttonColor};
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid ${templateData.buttonColor};
    }
    .button:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    .content {
      padding: 30px 40px;
    }
    .body-text {
      font-size: 16px;
      color: #666666;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      color: ${templateData.accentColor};
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }
    .section p {
      font-size: 15px;
      color: #666666;
      line-height: 1.7;
      margin: 0;
    }
    .app-badges {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin: 30px 0;
      flex-wrap: wrap;
    }
    .app-badge {
      display: inline-block;
    }
    .app-badge img {
      height: 40px;
      width: auto;
      display: block;
    }
    .download-links {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin: 30px 0;
    }
    .download-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background-color: #f0f0f0;
      border-radius: 6px;
      text-decoration: none;
      color: ${templateData.accentColor};
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      border: 1px solid #e0e0e0;
    }
    .download-link:hover {
      background-color: ${templateData.accentColor};
      color: white;
    }
    .footer {
      padding: 30px 40px;
      text-align: center;
      color: ${templateData.footerColor};
      font-size: 13px;
      line-height: 1.6;
      border-top: 1px solid #f0f0f0;
      background-color: #fafafa;
    }
    .footer a {
      color: ${templateData.accentColor};
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .header {
        padding: 30px 16px;
      }
      .header h1 {
        font-size: 24px;
      }
      .content, .subtitle, .footer, .button-container {
        padding: 20px 16px;
      }
      .app-badges, .download-links {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      ${templateData.logoUrl ? `<div class="logo"><img src="${templateData.logoUrl}" alt="Logo" /></div>` : ''}
      <h1>${templateData.title || 'Email Title'}</h1>
      ${templateData.subtitle ? `<p>${templateData.subtitle}</p>` : ''}
    </div>

    <!-- Body Content -->
    <div class="content">
      ${templateData.bodyText ? `<p class="body-text">${templateData.bodyText}</p>` : ''}

      <!-- CTA Button -->
      ${templateData.buttonText && templateData.buttonLink ? `<div class="button-container">
        <a href="${templateData.buttonLink}" class="button">${templateData.buttonText}</a>
      </div>` : ''}

      <!-- App Store Badges -->
      ${appBadges.length > 0 ? `<div class="app-badges">
        ${appBadges.map(badge => `
        <a href="${badge.link}" class="app-badge" target="_blank" rel="noopener noreferrer">
          <img src="${badge.type === 'google' ? 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' : 'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us'}" alt="${badge.type === 'google' ? 'Google Play' : 'App Store'}" />
        </a>
        `).join('')}
      </div>` : ''}

      <!-- Download Links -->
      ${downloadLinks.length > 0 ? `<div class="download-links">
        ${downloadLinks.map(link => `
        <a href="${link.url}" class="download-link" target="_blank" rel="noopener noreferrer">
          ${link.icon ? `<span>${link.icon}</span>` : ''}
          ${link.text}
        </a>
        `).join('')}
      </div>` : ''}

      <!-- Sections -->
      ${sections.length > 0 ? `
        ${sections.map(section => `
        <div class="section">
          <h2>${section.heading}</h2>
          <p>${section.content}</p>
        </div>
        `).join('')}
      ` : ''}
    </div>

    <!-- Footer -->
    ${templateData.footerText ? `<div class="footer">
      ${templateData.footerText}
    </div>` : ''}
  </div>
</body>
</html>`;

    setGeneratedHtml(template);
    setShowPreview(true);
    setActiveTab('preview');
    toast.success('Template generated successfully!');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      toast.success('HTML copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-template-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Template downloaded!');
  };

  const resetForm = () => {
    setTemplateData(defaultTemplate);
    setSections([]);
    setAppBadges([]);
    setDownloadLinks([]);
    setGeneratedHtml('');
    setShowPreview(false);
    toast.success('Form reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-soft">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#003496] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>Mail Template Generator Pro</h1>
              <p className="text-xs md:text-sm text-slate-600">Create professional email templates with ease</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Form</span>
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!showPreview} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="code" disabled={!showPreview} className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
            </TabsTrigger>
          </TabsList>

          {/* Form Tab */}
          <TabsContent value="form" className="space-y-6">
            <TemplateForm
              templateData={templateData}
              setTemplateData={setTemplateData}
              sections={sections}
              setSections={setSections}
              appBadges={appBadges}
              setAppBadges={setAppBadges}
              downloadLinks={downloadLinks}
              setDownloadLinks={setDownloadLinks}
            />

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button onClick={generateTemplateHtml} className="bg-[#003496] hover:bg-indigo-700">
                Generate Template
              </Button>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            {showPreview && (
              <div className="space-y-4">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy HTML
                  </Button>
                  <Button size="sm" onClick={downloadHtml} className="flex items-center gap-2 bg-[#003496] hover:bg-indigo-700">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
                <TemplatePreview html={generatedHtml} />
              </div>
            )}
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code">
            {showPreview && (
              <div className="space-y-4">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </Button>
                </div>
                <CodeDisplay code={generatedHtml} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
