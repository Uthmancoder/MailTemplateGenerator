import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

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

interface TemplateFormProps {
  templateData: TemplateData;
  setTemplateData: (data: TemplateData) => void;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  appBadges: AppBadge[];
  setAppBadges: (badges: AppBadge[]) => void;
  downloadLinks: DownloadLink[];
  setDownloadLinks: (links: DownloadLink[]) => void;
}

export default function TemplateForm({
  templateData,
  setTemplateData,
  sections,
  setSections,
  appBadges,
  setAppBadges,
  downloadLinks,
  setDownloadLinks,
}: TemplateFormProps) {
  const [currentSection, setCurrentSection] = useState<Omit<Section, 'id'>>({
    heading: '',
    content: '',
  });
  const [currentBadge, setCurrentBadge] = useState<Omit<AppBadge, 'id'>>({
    type: 'google',
    link: '',
  });
  const [currentLink, setCurrentLink] = useState<Omit<DownloadLink, 'id'>>({
    text: '',
    url: '',
    icon: '📥',
  });

  const handleTemplateChange = (key: keyof TemplateData, value: any) => {
    setTemplateData({
      ...templateData,
      [key]: value,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setTemplateData({
          ...templateData,
          logoUrl: result,
        });
        toast.success('Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const addSection = () => {
    if (!currentSection.heading.trim() || !currentSection.content.trim()) {
      toast.error('Please fill in both heading and content');
      return;
    }
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        ...currentSection,
      },
    ]);
    setCurrentSection({ heading: '', content: '' });
    toast.success('Section added');
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
    toast.success('Section removed');
  };

  const addAppBadge = () => {
    if (!currentBadge.link.trim()) {
      toast.error('Please enter a link');
      return;
    }
    setAppBadges([
      ...appBadges,
      {
        id: Date.now().toString(),
        ...currentBadge,
      },
    ]);
    setCurrentBadge({ type: 'google', link: '' });
    toast.success('App badge added');
  };

  const removeAppBadge = (id: string) => {
    setAppBadges(appBadges.filter((b) => b.id !== id));
    toast.success('Badge removed');
  };

  const addDownloadLink = () => {
    if (!currentLink.text.trim() || !currentLink.url.trim()) {
      toast.error('Please fill in text and URL');
      return;
    }
    setDownloadLinks([
      ...downloadLinks,
      {
        id: Date.now().toString(),
        ...currentLink,
      },
    ]);
    setCurrentLink({ text: '', url: '', icon: '📥' });
    toast.success('Download link added');
  };

  const removeDownloadLink = (id: string) => {
    setDownloadLinks(downloadLinks.filter((l) => l.id !== id));
    toast.success('Link removed');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email Title *
              </label>
              <Input
                value={templateData.title}
                onChange={(e) => handleTemplateChange('title', e.target.value)}
                placeholder="Welcome to Our Platform"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Subtitle
              </label>
              <Input
                value={templateData.subtitle}
                onChange={(e) => handleTemplateChange('subtitle', e.target.value)}
                placeholder="Get started with our amazing service"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Body Text
              </label>
              <Textarea
                value={templateData.bodyText}
                onChange={(e) => handleTemplateChange('bodyText', e.target.value)}
                placeholder="Main content of your email"
                rows={4}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Button Text
                </label>
                <Input
                  value={templateData.buttonText}
                  onChange={(e) => handleTemplateChange('buttonText', e.target.value)}
                  placeholder="Get Started"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Button Link
                </label>
                <Input
                  value={templateData.buttonLink}
                  onChange={(e) => handleTemplateChange('buttonLink', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Footer Text
              </label>
              <Textarea
                value={templateData.footerText}
                onChange={(e) => handleTemplateChange('footerText', e.target.value)}
                placeholder="Footer content"
                rows={2}
                className="w-full"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Styling Tab */}
        <TabsContent value="styling" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Logo Upload
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {templateData.logoUrl && (
                  <img
                    src={templateData.logoUrl}
                    alt="Logo preview"
                    className="h-12 w-auto"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Logo Width (px)
              </label>
              <Input
                type="number"
                value={templateData.logoWidth}
                onChange={(e) => handleTemplateChange('logoWidth', parseInt(e.target.value))}
                min="20"
                max="200"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Header Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={templateData.headerColor}
                    onChange={(e) => handleTemplateChange('headerColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={templateData.headerColor}
                    onChange={(e) => handleTemplateChange('headerColor', e.target.value)}
                    placeholder="#4F46E5"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={templateData.accentColor}
                    onChange={(e) => handleTemplateChange('accentColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={templateData.accentColor}
                    onChange={(e) => handleTemplateChange('accentColor', e.target.value)}
                    placeholder="#FF6B6B"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Button Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={templateData.buttonColor}
                    onChange={(e) => handleTemplateChange('buttonColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={templateData.buttonColor}
                    onChange={(e) => handleTemplateChange('buttonColor', e.target.value)}
                    placeholder="#4F46E5"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Footer Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={templateData.footerColor}
                    onChange={(e) => handleTemplateChange('footerColor', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={templateData.footerColor}
                    onChange={(e) => handleTemplateChange('footerColor', e.target.value)}
                    placeholder="#999999"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Font Family
              </label>
              <select
                value={templateData.fontFamily}
                onChange={(e) => handleTemplateChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Section Heading
              </label>
              <Input
                value={currentSection.heading}
                onChange={(e) => setCurrentSection({ ...currentSection, heading: e.target.value })}
                placeholder="e.g., FEATURES, BENEFITS"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Section Content
              </label>
              <Textarea
                value={currentSection.content}
                onChange={(e) => setCurrentSection({ ...currentSection, content: e.target.value })}
                placeholder="Section description"
                rows={3}
                className="w-full"
              />
            </div>

            <Button onClick={addSection} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>

            {sections.length > 0 && (
              <div className="space-y-2 mt-6 pt-6 border-t">
                <h3 className="font-semibold text-slate-900">Added Sections:</h3>
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-start justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{section.heading}</p>
                      <p className="text-sm text-slate-600">{section.content}</p>
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Downloads Tab */}
        <TabsContent value="downloads" className="space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">App Store Badges</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Badge Type
                  </label>
                  <select
                    value={currentBadge.type}
                    onChange={(e) => setCurrentBadge({ ...currentBadge, type: e.target.value as 'google' | 'apple' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="google">Google Play Store</option>
                    <option value="apple">Apple App Store</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Link
                  </label>
                  <Input
                    value={currentBadge.link}
                    onChange={(e) => setCurrentBadge({ ...currentBadge, link: e.target.value })}
                    placeholder="https://play.google.com/store/apps/..."
                    className="w-full"
                  />
                </div>

                <Button onClick={addAppBadge} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Badge
                </Button>
              </div>

              {appBadges.length > 0 && (
                <div className="space-y-2 mt-4 pt-4 border-t">
                  {appBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm text-slate-900">
                        {badge.type === 'google' ? '🔵 Google Play' : '🍎 App Store'} - {badge.link}
                      </span>
                      <button
                        onClick={() => removeAppBadge(badge.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold text-slate-900 mb-4">Custom Download Links</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Link Text
                  </label>
                  <Input
                    value={currentLink.text}
                    onChange={(e) => setCurrentLink({ ...currentLink, text: e.target.value })}
                    placeholder="Download PDF"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    URL
                  </label>
                  <Input
                    value={currentLink.url}
                    onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
                    placeholder="https://example.com/file.pdf"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Icon (emoji or text)
                  </label>
                  <Input
                    value={currentLink.icon}
                    onChange={(e) => setCurrentLink({ ...currentLink, icon: e.target.value })}
                    placeholder="📥"
                    maxLength={3}
                    className="w-full"
                  />
                </div>

                <Button onClick={addDownloadLink} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              {downloadLinks.length > 0 && (
                <div className="space-y-2 mt-4 pt-4 border-t">
                  {downloadLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm text-slate-900">
                        {link.icon} {link.text}
                      </span>
                      <button
                        onClick={() => removeDownloadLink(link.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
